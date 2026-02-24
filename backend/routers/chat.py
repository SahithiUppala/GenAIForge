from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from core.database import get_db
from routers.auth import get_current_user
from models.user import User
from models.conversation import Conversation, Message
from models.paper import Paper
from models.schemas import ChatMessage
from utils.groq_client import client, MODEL_CONFIG
from utils.embeddings import generate_embedding, find_similar_papers

router = APIRouter()


@router.post("/chat")
async def chat_with_papers(
    message: ChatMessage,
    workspace_id: Optional[int] = None,
    conversation_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Chat with AI using context from workspace papers"""
    
    # Get user
    user = db.query(User).filter(User.email == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get or create conversation
    if conversation_id:
        conversation = db.query(Conversation).filter(
            Conversation.id == conversation_id,
            Conversation.user_id == user.id
        ).first()
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        conversation = Conversation(user_id=user.id, workspace_id=workspace_id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
    
    # Save user message
    user_message = Message(
        conversation_id=conversation.id,
        role="user",
        content=message.content
    )
    db.add(user_message)
    db.commit()
    
    # Build context from papers if workspace is specified
    context = ""
    if workspace_id:
        papers = db.query(Paper).filter(Paper.workspace_id == workspace_id).all()
        
        if papers:
            # Generate embedding for user query
            query_embedding = generate_embedding(message.content)
            
            # Find relevant papers using semantic search
            papers_data = [
                {
                    'id': p.id,
                    'title': p.title,
                    'abstract': p.abstract,
                    'authors': p.authors,
                    'year': p.year,
                    'embedding': p.embedding
                }
                for p in papers if p.embedding
            ]
            
            relevant_papers = find_similar_papers(query_embedding, papers_data, top_k=3)
            
            if relevant_papers:
                context = "\n\nRelevant papers from your workspace:\n"
                for i, paper in enumerate(relevant_papers, 1):
                    context += f"\n{i}. {paper['title']}"
                    if paper.get('authors'):
                        context += f" by {paper['authors']}"
                    if paper.get('year'):
                        context += f" ({paper['year']})"
                    if paper.get('abstract'):
                        context += f"\nAbstract: {paper['abstract'][:300]}..."
                    context += "\n"
    
    # Get conversation history
    history_messages = db.query(Message).filter(
        Message.conversation_id == conversation.id
    ).order_by(Message.created_at).limit(10).all()
    
    # Build messages for Groq
    groq_messages = [
        {
            "role": "system",
            "content": f"You are a helpful research assistant. You help researchers understand and analyze academic papers. {context}"
        }
    ]
    
    # Add conversation history (excluding the last user message we just added)
    for msg in history_messages[:-1]:
        groq_messages.append({
            "role": msg.role,
            "content": msg.content
        })
    
    # Add current user message
    groq_messages.append({
        "role": "user",
        "content": message.content
    })
    
    # Get AI response
    response = client.chat.completions.create(
        messages=groq_messages,
        **MODEL_CONFIG
    )
    
    ai_response = response.choices[0].message.content
    
    # Save AI message
    ai_message = Message(
        conversation_id=conversation.id,
        role="assistant",
        content=ai_response
    )
    db.add(ai_message)
    db.commit()
    
    return {
        "response": ai_response,
        "conversation_id": conversation.id
    }


@router.get("/conversations")
async def get_conversations(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all conversations for current user"""
    user = db.query(User).filter(User.email == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    conversations = db.query(Conversation).filter(
        Conversation.user_id == user.id
    ).order_by(Conversation.created_at.desc()).all()
    
    return conversations


@router.get("/conversation/{conversation_id}/messages")
async def get_conversation_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all messages in a conversation"""
    user = db.query(User).filter(User.email == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == user.id
    ).first()
    
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    messages = db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.created_at).all()
    
    return messages


@router.delete("/conversation/{conversation_id}")
async def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a conversation"""
    user = db.query(User).filter(User.email == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    conversation = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == user.id
    ).first()
    
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    db.delete(conversation)
    db.commit()
    
    return {"message": "Conversation deleted successfully"}