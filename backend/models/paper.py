from sqlalchemy import Column, Integer, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from core.database import Base


class Paper(Base):
    __tablename__ = "papers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    abstract = Column(Text, nullable=True)
    authors = Column(String, nullable=True)
    year = Column(Integer, nullable=True)
    citations = Column(Integer, nullable=True)
    url = Column(String, nullable=True)
    embedding = Column(JSON, nullable=True)  # Store vector embeddings as JSON
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))

    workspace = relationship("Workspace", back_populates="papers")