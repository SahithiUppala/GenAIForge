from pydantic import BaseModel
from typing import Optional


class PaperImport(BaseModel):
    title: str
    abstract: Optional[str] = None
    authors: Optional[str] = None
    year: Optional[int] = None
    citations: Optional[int] = None
    url: Optional[str] = None
    workspace_id: int


class PaperResponse(BaseModel):
    id: int
    title: str
    abstract: Optional[str]
    authors: Optional[str]
    year: Optional[int]
    citations: Optional[int]
    url: Optional[str]
    workspace_id: int

    class Config:
        from_attributes = True