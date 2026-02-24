from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
import requests
import os

from core.database import get_db
from models.paper import Paper
from schemas.paper import PaperImport, PaperResponse
from utils.embeddings import generate_embedding
from routers.auth import get_current_user

router = APIRouter()

# Get API key from environment if available
SEMANTIC_SCHOLAR_API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")


@router.get("/search")
async def search_papers(query: str):
    url = "https://api.semanticscholar.org/graph/v1/paper/search"
    headers = {"User-Agent": "ResearchPilot/1.0"}
    
    # Add API key if available
    if SEMANTIC_SCHOLAR_API_KEY:
        headers["x-api-key"] = SEMANTIC_SCHOLAR_API_KEY
    
    params = {
        "query": query,
        "limit": 10,
        "fields": "title,abstract,authors,year,citationCount,url,openAccessPdf"
    }

    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        
        if response.status_code == 429:
            # Rate limited - return mock data for demo
            return {
                "papers": [
                    {
                        "title": f"Research Paper on {query} - Sample 1",
                        "abstract": f"This is a sample paper about {query}. The Semantic Scholar API is currently rate-limited. Please try again later or add an API key to your .env file.",
                        "authors": "Sample Author et al.",
                        "year": 2024,
                        "citations": 42,
                        "url": "https://arxiv.org/pdf/2301.00001.pdf",
                        "has_pdf": True
                    },
                    {
                        "title": f"Advanced Study of {query} - Sample 2",
                        "abstract": f"Another sample paper discussing {query}. This is demo data shown because the API has rate limits.",
                        "authors": "Demo Researcher, Test Author",
                        "year": 2023,
                        "citations": 28,
                        "url": "https://arxiv.org/pdf/2301.00002.pdf",
                        "has_pdf": True
                    }
                ],
                "note": "API rate limited. Showing sample data. Add SEMANTIC_SCHOLAR_API_KEY to .env for higher limits."
            }
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        data = response.json()
        papers = []

        for paper in data.get("data", []):
            authors = ", ".join([author.get("name", "") for author in paper.get("authors", [])])
            
            # Get PDF URL if available, otherwise use paper URL
            pdf_info = paper.get("openAccessPdf")
            paper_url = pdf_info.get("url") if pdf_info else paper.get("url")
            
            papers.append({
                "title": paper.get("title"),
                "abstract": paper.get("abstract"),
                "authors": authors,
                "year": paper.get("year"),
                "citations": paper.get("citationCount"),
                "url": paper_url,
                "has_pdf": bool(pdf_info)
            })

        return {"papers": papers}

    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="API request timed out")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/import", response_model=PaperResponse)
async def import_paper(
    paper_data: PaperImport,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Import a paper into a workspace with vector embedding"""
    
    # Generate embedding from title + abstract
    text_for_embedding = f"{paper_data.title} {paper_data.abstract or ''}"
    embedding = generate_embedding(text_for_embedding)
    
    new_paper = Paper(
        title=paper_data.title,
        abstract=paper_data.abstract,
        authors=paper_data.authors,
        year=paper_data.year,
        citations=paper_data.citations,
        url=paper_data.url,
        embedding=embedding,
        workspace_id=paper_data.workspace_id
    )
    
    db.add(new_paper)
    db.commit()
    db.refresh(new_paper)
    
    return new_paper


@router.get("/workspace/{workspace_id}", response_model=list[PaperResponse])
async def get_workspace_papers(
    workspace_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all papers in a workspace"""
    papers = db.query(Paper).filter(Paper.workspace_id == workspace_id).all()
    return papers


@router.delete("/{paper_id}")
async def delete_paper(
    paper_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a paper from workspace"""
    paper = db.query(Paper).filter(Paper.id == paper_id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    
    db.delete(paper)
    db.commit()
    
    return {"message": "Paper deleted successfully"}