# ResearchPilot AI - Quick Start

## 🚀 Start the Application

### Windows (Easiest)
```bash
start.bat
```

### Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 📍 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## ✅ First Time Setup Checklist

- [ ] PostgreSQL installed and running
- [ ] Database `researchpilot` created
- [ ] Backend dependencies installed: `cd backend && pip install -r requirements.txt`
- [ ] Frontend dependencies installed: `cd frontend && npm install`
- [ ] Environment variables configured in `backend/.env`

## 🔧 Quick Commands

### Backend
```bash
# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload

# Run on different port
uvicorn main:app --reload --port 8001
```

### Frontend
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

### Database
```bash
# Create database
psql -U postgres -c "CREATE DATABASE researchpilot;"

# Connect to database
psql -U postgres -d researchpilot

# Check if PostgreSQL is running
pg_isready
```

## 🎯 Test the App

1. Open http://localhost:5173
2. Register a new account
3. Login with your credentials
4. Try searching for papers: "machine learning"
5. Create a workspace
6. Import papers to workspace
7. Chat with AI about your papers

## ❌ Common Issues

**PostgreSQL not running:**
```bash
# Windows
net start postgresql-x64-XX
```

**Port already in use:**
- Backend: Use `--port 8001`
- Frontend: Vite will suggest another port

**Module not found:**
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

**Database connection error:**
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `backend/.env`
- Ensure database exists

## 📚 Documentation

- Full setup guide: `SETUP_GUIDE.md`
- Project overview: `README.md`
- API docs: http://localhost:8000/docs

## 🔑 Default Configuration

The app is pre-configured with:
- Database: `researchpilot` on localhost:5432
- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- JWT expiry: 60 minutes
- AI Model: Groq Llama 3.3 70B

All settings can be modified in `backend/.env`
