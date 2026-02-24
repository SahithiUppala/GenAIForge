# ResearchPilot AI - Complete Setup Guide

## Quick Start (Windows)

### Option 1: Automated Startup (Recommended)
```bash
# Double-click start.bat or run:
start.bat
```

### Option 2: Manual Startup

**Terminal 1 - Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Prerequisites Installation

### 1. Python 3.8+
Download from: https://www.python.org/downloads/
- During installation, check "Add Python to PATH"
- Verify: `python --version`

### 2. Node.js 18+
Download from: https://nodejs.org/
- Install LTS version
- Verify: `node --version` and `npm --version`

### 3. PostgreSQL 12+
Download from: https://www.postgresql.org/download/

**Windows Installation:**
1. Download PostgreSQL installer
2. During setup, remember the password for user `postgres`
3. Default port: 5432
4. Start PostgreSQL service from Windows Services

**Create Database:**
```bash
# Open Command Prompt or PowerShell
psql -U postgres

# In PostgreSQL prompt:
CREATE DATABASE researchpilot;
\q
```

### 4. Update Database Connection (if needed)

If your PostgreSQL password is different, update `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/researchpilot
```

## First Time Setup

### Backend Setup
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# This will install:
# - FastAPI (web framework)
# - SQLAlchemy (database ORM)
# - Groq (AI client)
# - sentence-transformers (embeddings)
# - And other dependencies
```

### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# This will install:
# - React & React Router
# - TypeScript
# - Vite (build tool)
# - Tailwind CSS
# - Axios (HTTP client)
```

## Running the Application

### Start Backend (Terminal 1)
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.4.1  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Testing the Application

1. **Open Browser**: Navigate to http://localhost:5173

2. **Register Account**:
   - Click "Sign up"
   - Enter email and password
   - Click "Create Account"

3. **Login**:
   - Enter your credentials
   - You'll be redirected to the dashboard

4. **Test Features**:
   - **Search Papers**: Click "Search Papers" and try searching for "machine learning"
   - **Create Workspace**: Click "Workspaces" and create a new workspace
   - **Import Papers**: Import papers from search results into your workspace
   - **AI Chat**: Click "AI Chat" and ask questions about your papers

## API Documentation

Once backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Root Endpoint**: http://localhost:8000

## Troubleshooting

### Backend Issues

**Error: "ModuleNotFoundError"**
```bash
cd backend
pip install -r requirements.txt
```

**Error: "Could not connect to database"**
- Check if PostgreSQL is running
- Verify database exists: `psql -U postgres -l`
- Check credentials in `backend/.env`

**Error: "Port 8000 already in use"**
```bash
# Use different port
uvicorn main:app --reload --port 8001
# Update frontend/src/api.ts to use port 8001
```

### Frontend Issues

**Error: "Cannot find module"**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 5173 already in use"**
- Vite will automatically suggest another port
- Or kill the process using port 5173

### Database Issues

**PostgreSQL not running:**
```bash
# Windows
net start postgresql-x64-XX

# Check status
pg_isready
```

**Database doesn't exist:**
```bash
psql -U postgres
CREATE DATABASE researchpilot;
\q
```

**Connection refused:**
- Check if PostgreSQL is listening on port 5432
- Verify `pg_hba.conf` allows local connections

## Environment Variables

The `backend/.env` file contains all configuration:

```env
# Database
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/researchpilot

# JWT Authentication
SECRET_KEY=supersecretkey123456789
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# Groq AI API
GROQ_API_KEY=your_groq_api_key_here
```

## Development Tips

### Backend Development
- Auto-reload is enabled with `--reload` flag
- Check logs in terminal for errors
- Use `/docs` endpoint to test API directly

### Frontend Development
- Vite provides hot module replacement (HMR)
- Changes reflect immediately in browser
- Check browser console for errors

### Database Management
```bash
# Connect to database
psql -U postgres -d researchpilot

# List tables
\dt

# View table structure
\d users
\d workspaces
\d papers
\d conversations

# Query data
SELECT * FROM users;
```

## Production Deployment

For production deployment, you'll need to:

1. **Backend**:
   - Use production WSGI server (gunicorn)
   - Set secure SECRET_KEY
   - Use environment variables for sensitive data
   - Enable HTTPS

2. **Frontend**:
   - Build production bundle: `npm run build`
   - Serve static files with nginx or similar
   - Update API_BASE_URL to production backend

3. **Database**:
   - Use managed PostgreSQL service
   - Enable SSL connections
   - Regular backups

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation at `/docs`
3. Check browser console and terminal logs
4. Verify all prerequisites are installed

## Next Steps

After successful setup:
1. Explore the API documentation
2. Try searching for papers
3. Create workspaces and organize papers
4. Chat with AI about your research
5. Customize the frontend styling
6. Add more features!
