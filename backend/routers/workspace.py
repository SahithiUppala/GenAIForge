from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.database import get_db
from routers.auth import get_current_user
from models.user import User
from models.workspace import Workspace
from schemas.workspace import WorkspaceCreate, WorkspaceOut

router = APIRouter()


@router.post("/create", response_model=WorkspaceOut)
def create_workspace(
    workspace: WorkspaceCreate,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Create a new workspace for the current user"""
    
    # Get user by email
    user = db.query(User).filter(User.email == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_workspace = Workspace(
        name=workspace.name,
        owner_id=user.id
    )
    
    db.add(new_workspace)
    db.commit()
    db.refresh(new_workspace)
    
    return new_workspace


@router.get("/my", response_model=list[WorkspaceOut])
def get_workspaces(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Get all workspaces for the current user"""
    
    # Get user by email
    user = db.query(User).filter(User.email == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    workspaces = db.query(Workspace).filter(Workspace.owner_id == user.id).all()
    return workspaces


@router.delete("/{workspace_id}")
def delete_workspace(
    workspace_id: int,
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    """Delete a workspace"""
    
    user = db.query(User).filter(User.email == current_user).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    workspace = db.query(Workspace).filter(
        Workspace.id == workspace_id,
        Workspace.owner_id == user.id
    ).first()
    
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    
    db.delete(workspace)
    db.commit()
    
    return {"message": "Workspace deleted successfully"}
