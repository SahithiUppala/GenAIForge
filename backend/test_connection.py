"""
Test database connection and configuration
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

def test_connection():
    """Test PostgreSQL connection"""
    database_url = os.getenv("DATABASE_URL")
    
    print("Testing database connection...")
    print(f"Database URL: {database_url.replace(database_url.split(':')[2].split('@')[0], '****')}")
    
    try:
        engine = create_engine(database_url)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version();"))
            version = result.fetchone()[0]
            print(f"✅ Connection successful!")
            print(f"PostgreSQL version: {version}")
            
            # Check if tables exist
            result = conn.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """))
            tables = [row[0] for row in result]
            
            if tables:
                print(f"\nExisting tables: {', '.join(tables)}")
            else:
                print("\n⚠️  No tables found. Run 'python init_db.py' to create tables.")
                
    except Exception as e:
        print(f"❌ Connection failed: {str(e)}")
        print("\nTroubleshooting:")
        print("1. Check if PostgreSQL is running: pg_isready")
        print("2. Verify database exists: psql -U postgres -l")
        print("3. Check credentials in .env file")

if __name__ == "__main__":
    test_connection()
