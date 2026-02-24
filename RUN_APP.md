# 🚀 How to Run ResearchPilot AI

## Prerequisites Check

Before starting, ensure you have:
- ✅ Python 3.8+ installed
- ✅ Node.js 18+ installed  
- ✅ PostgreSQL 12+ installed and running
- ✅ Database `researchpilot` created

## Step-by-Step Instructions

### Step 1: Verify PostgreSQL

```bash
# Check if PostgreSQL is running
pg_isready

# If not running (Windows):
net start postgresql-x64-XX

# Create database (if not exists)
psql -U postgres -c "CREATE DATABASE researchpilot;"
```

### Step 2: Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

This installs:
- FastAPI, Uvicorn (web server)
- SQLAlchemy, psycopg2 (database)
- Groq (AI client)
- sentence-transformers (embeddings)
- python-jose, passlib (authentication)
- And more...

### Step 3: Test Database Connection (Optional)

```bash
python test_connection.py
```

### Step 4: Start Backend Server

```bash
# From backend directory
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

✅ Backend is now running at http://localhost:8000

### Step 5: Install Frontend Dependencies

Open a NEW terminal:

```bash
cd frontend
npm install
```

This installs:
- React, React Router
- TypeScript
- Vite (build tool)
- Tailwind CSS
- Axios (HTTP client)
- Lucide React (icons)

### Step 6: Start Frontend Server

```bash
# From frontend directory
npm run dev
```

You should see:
```
VITE v5.4.1  ready in XXX ms
➜  Local:   http://localhost:5173/
```

✅ Frontend is now running at http://localhost:5173

## Access the Application

Open your browser and navigate to:
**http://localhost:5173**

## First Time Usage

1. **Register**: Click "Sign up" and create an account
2. **Login**: Sign in with your credentials
3. **Dashboard**: You'll see the main dashboard
4. **Search Papers**: Try searching for "machine learning" or "neural networks"
5. **Create Workspace**: Create a workspace to organize papers
6. **Import Papers**: Add papers from search results to your workspace
7. **AI Chat**: Ask questions about your papers

## API Documentation

While the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Using the Automated Startup Script

### Windows
```bash
# Double-click or run:
start.bat
```

This will:
1. Check PostgreSQL status
2. Start backend server
3. Start frontend server
4. Open in separate terminal windows

## Stopping the Application

### Manual Method
- Press `Ctrl+C` in each terminal window

### Automated Script
- Close the terminal windows that were opened by `start.bat`

## Troubleshooting

### "ModuleNotFoundError" (Backend)
```bash
cd backend
pip install -r requirements.txt
```

### "Cannot find module" (Frontend)
```bash
cd frontend
npm install
```

### "Connection refused" (Database)
```bash
# Check PostgreSQL status
pg_isready

# Start PostgreSQL (Windows)
net start postgresql-x64-XX
```

### "Port already in use"
```bash
# Backend - use different port
uvicorn main:app --reload --port 8001

# Frontend - Vite will suggest another port automatically
```

### Database doesn't exist
```bash
psql -U postgres
CREATE DATABASE researchpilot;
\q
```

## Environment Configuration

The `backend/.env` file contains:
```env
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/researchpilot
SECRET_KEY=supersecretkey123456789
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
GROQ_API_KEY=your_groq_api_key_here
```

Update the DATABASE_URL if your PostgreSQL password is different.

## What Happens on First Run?

1. **Database Tables Created**: The backend automatically creates all necessary tables:
   - users
   - workspaces
   - papers
   - conversations
   - messages

2. **Frontend Builds**: Vite compiles the React application

3. **Ready to Use**: You can immediately register and start using the app

## Development Mode Features

- **Backend Auto-reload**: Changes to Python files automatically restart the server
- **Frontend HMR**: Changes to React files instantly reflect in the browser
- **API Documentation**: Interactive API testing at `/docs`

## Next Steps

After successful startup:
1. Explore the dashboard
2. Search for academic papers
3. Create workspaces
4. Import papers
5. Chat with AI about your research
6. Check API documentation

## Need Help?

- Check `SETUP_GUIDE.md` for detailed setup instructions
- Check `QUICK_START.md` for quick reference
- Check `README.md` for project overview
- Review logs in terminal for error messages
- Visit http://localhost:8000/docs for API documentation

## System Requirements

- **RAM**: 4GB minimum (8GB recommended)
- **Storage**: 2GB free space
- **Network**: Internet connection for paper search and AI features
- **Browser**: Modern browser (Chrome, Firefox, Edge, Safari)

## Performance Tips

- First startup may take longer (downloading ML models)
- Subsequent startups are faster
- Keep PostgreSQL running for best performance
- Use SSD for better database performance

---

**Ready to start?** Run `start.bat` (Windows) or follow the manual steps above!
