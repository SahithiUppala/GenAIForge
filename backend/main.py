from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.database import engine, Base

# Import models first to ensure they're registered with SQLAlchemy
from models.user import User
from models.workspace import Workspace
from models.paper import Paper
from models.conversation import Conversation, Message

# Routers
from routers.auth import router as auth_router
from routers.workspace import router as workspace_router
from routers.papers import router as papers_router
from routers.chat import router as chat_router

app = FastAPI(title="ResearchPilot AI Backend")

# CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(auth_router, tags=["auth"])
app.include_router(workspace_router, prefix="/workspace", tags=["workspace"])
app.include_router(papers_router, prefix="/papers", tags=["papers"])
app.include_router(chat_router, tags=["chat"])


@app.get("/")
def root():
    return {
        "message": "ResearchPilot AI Backend Running",
        "version": "1.0.0",
        "features": [
            "User Authentication (JWT)",
            "Research Paper Search (Semantic Scholar)",
            "Workspace Management",
            "AI Chat with Context (Groq Llama 3.3)",
            "Vector Embeddings & Semantic Search",
            "Conversation History"
        ]
    }