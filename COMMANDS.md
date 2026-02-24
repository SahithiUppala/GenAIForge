# 📝 ResearchPilot AI - All Commands Reference

## Quick Start

### Automated (Windows)
```bash
start.bat
```

### Manual Start
```bash
# Terminal 1 - Backend
cd backend
uvicorn main:app --reload

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## Installation Commands

### Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Node Dependencies
```bash
cd frontend
npm install
```

## Database Commands

### PostgreSQL Service
```bash
# Check if running
pg_isready

# Start service (Windows)
net start postgresql-x64-XX

# Start service (Mac)
brew services start postgresql

# Start service (Linux)
sudo systemctl start postgresql
```

### Database Management
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
psql -U postgres -c "CREATE DATABASE researchpilot;"

# List databases
psql -U postgres -l

# Connect to specific database
psql -U postgres -d researchpilot

# Drop database (careful!)
psql -U postgres -c "DROP DATABASE researchpilot;"

# Recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS researchpilot;"
psql -U postgres -c "CREATE DATABASE researchpilot;"
```

### Database Queries (inside psql)
```sql
-- List tables
\dt

-- Describe table structure
\d users
\d workspaces
\d papers
\d conversations
\d messages

-- View data
SELECT * FROM users;
SELECT * FROM workspaces;
SELECT * FROM papers;
SELECT * FROM conversations;
SELECT * FROM messages;

-- Count records
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM papers;

-- Delete all data (careful!)
TRUNCATE users CASCADE;

-- Exit psql
\q
```

## Backend Commands

### Run Server
```bash
cd backend

# Development mode (auto-reload)
uvicorn main:app --reload

# Specify host and port
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Different port
uvicorn main:app --reload --port 8001

# Production mode (no reload)
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Testing
```bash
cd backend

# Test database connection
python test_connection.py

# Initialize database tables
python init_db.py

# Run Python shell
python

# In Python shell:
from core.database import engine, Base
from models.user import User
Base.metadata.create_all(bind=engine)
```

### Package Management
```bash
# Install specific package
pip install fastapi

# Install from requirements
pip install -r requirements.txt

# Update requirements file
pip freeze > requirements.txt

# Uninstall package
pip uninstall package-name

# List installed packages
pip list

# Show package info
pip show fastapi
```

## Frontend Commands

### Development
```bash
cd frontend

# Run dev server
npm run dev

# Run on different port
npm run dev -- --port 3000

# Build for production
npm run build

# Preview production build
npm run preview
```

### Package Management
```bash
# Install dependencies
npm install

# Install specific package
npm install axios

# Install dev dependency
npm install -D typescript

# Uninstall package
npm uninstall package-name

# Update packages
npm update

# List installed packages
npm list

# Check for outdated packages
npm outdated

# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Git Commands

### Basic Git
```bash
# Initialize repository
git init

# Check status
git status

# Add files
git add .
git add filename

# Commit changes
git commit -m "Your message"

# View history
git log
git log --oneline

# Create branch
git branch feature-name
git checkout -b feature-name

# Switch branch
git checkout main

# Merge branch
git merge feature-name

# Push to remote
git push origin main

# Pull from remote
git pull origin main
```

### Useful Git Commands
```bash
# Discard changes
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View differences
git diff

# View remote
git remote -v

# Add remote
git remote add origin <url>
```

## System Commands

### File Operations
```bash
# List files
ls          # Unix
dir         # Windows

# Change directory
cd folder-name

# Go back
cd ..

# Create directory
mkdir folder-name

# Remove directory
rm -rf folder-name    # Unix
rmdir /s folder-name  # Windows

# Copy file
cp source dest        # Unix
copy source dest      # Windows

# Move/rename file
mv old new           # Unix
move old new         # Windows

# View file content
cat filename         # Unix
type filename        # Windows

# Find files
find . -name "*.py"  # Unix
dir /s *.py          # Windows
```

### Process Management
```bash
# List running processes
ps aux              # Unix
tasklist            # Windows

# Kill process by PID
kill PID            # Unix
taskkill /PID PID   # Windows

# Kill process by name
pkill python        # Unix
taskkill /IM python.exe /F  # Windows

# Find process using port
lsof -i :8000       # Unix
netstat -ano | findstr :8000  # Windows
```

### Network Commands
```bash
# Check if port is open
curl http://localhost:8000

# Test API endpoint
curl http://localhost:8000/
curl -X POST http://localhost:8000/register

# Check network connectivity
ping google.com

# View network connections
netstat -an
```

## Testing Commands

### Backend API Testing (curl)
```bash
# Test root endpoint
curl http://localhost:8000/

# Register user
curl -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Login
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=test123"

# Get current user (with token)
curl http://localhost:8000/me \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search papers
curl "http://localhost:8000/papers/search?query=machine+learning"
```

### Frontend Testing
```bash
# Open in browser
start http://localhost:5173        # Windows
open http://localhost:5173         # Mac
xdg-open http://localhost:5173     # Linux
```

## Troubleshooting Commands

### Check Versions
```bash
python --version
node --version
npm --version
psql --version
pip --version
```

### Check Services
```bash
# PostgreSQL
pg_isready

# Backend
curl http://localhost:8000

# Frontend
curl http://localhost:5173
```

### View Logs
```bash
# Backend logs (in terminal running uvicorn)
# Frontend logs (in terminal running npm run dev)
# PostgreSQL logs (location varies by OS)

# Windows PostgreSQL logs
C:\Program Files\PostgreSQL\XX\data\log\

# Mac PostgreSQL logs
/usr/local/var/postgres/

# Linux PostgreSQL logs
/var/log/postgresql/
```

### Clean Up
```bash
# Remove Python cache
find . -type d -name __pycache__ -exec rm -rf {} +
find . -type f -name "*.pyc" -delete

# Remove Node modules
rm -rf node_modules package-lock.json

# Clear pip cache
pip cache purge

# Clear npm cache
npm cache clean --force
```

## Environment Commands

### Virtual Environment (Python)
```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Unix)
source venv/bin/activate

# Deactivate
deactivate

# Install in virtual environment
pip install -r requirements.txt
```

### Environment Variables
```bash
# View environment variables (Windows)
set

# View environment variables (Unix)
env

# Set environment variable (Windows)
set VARIABLE_NAME=value

# Set environment variable (Unix)
export VARIABLE_NAME=value

# View specific variable (Windows)
echo %VARIABLE_NAME%

# View specific variable (Unix)
echo $VARIABLE_NAME
```

## Useful Shortcuts

### Terminal Shortcuts
```bash
Ctrl+C          # Stop running process
Ctrl+D          # Exit shell
Ctrl+L          # Clear screen
Ctrl+R          # Search command history
Tab             # Auto-complete
Up/Down Arrow   # Navigate command history
```

### VS Code Shortcuts
```bash
Ctrl+`          # Toggle terminal
Ctrl+B          # Toggle sidebar
Ctrl+P          # Quick file open
Ctrl+Shift+P    # Command palette
Ctrl+/          # Toggle comment
Ctrl+S          # Save file
```

## Production Commands

### Build for Production
```bash
# Frontend build
cd frontend
npm run build

# Backend with gunicorn
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Docker Commands (if using Docker)
```bash
# Build image
docker build -t researchpilot .

# Run container
docker run -p 8000:8000 researchpilot

# View running containers
docker ps

# Stop container
docker stop container_id

# View logs
docker logs container_id
```

---

## Quick Reference Card

```
START APP:        start.bat (Windows) or manual commands
BACKEND:          cd backend && uvicorn main:app --reload
FRONTEND:         cd frontend && npm run dev
DATABASE:         pg_isready (check) | psql -U postgres (connect)
API DOCS:         http://localhost:8000/docs
FRONTEND:         http://localhost:5173
STOP:             Ctrl+C in each terminal
```

---

**Tip**: Bookmark this file for quick command reference!
