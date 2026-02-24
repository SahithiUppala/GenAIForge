"""
Database initialization script
Run this to create all tables in the database
"""
from core.database import engine, Base
from models.user import User
from models.workspace import Workspace
from models.paper import Paper
from models.conversation import Conversation, Message

def init_database():
    """Create all database tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
    print("\nTables created:")
    print("  - users")
    print("  - workspaces")
    print("  - papers")
    print("  - conversations")
    print("  - messages")

if __name__ == "__main__":
    init_database()
