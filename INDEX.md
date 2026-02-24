# 📚 ResearchPilot AI - Documentation Index

Welcome to ResearchPilot AI! This index will help you find the right documentation for your needs.

## 🚀 Getting Started

**New to the project? Start here:**

1. **[QUICK_START.md](QUICK_START.md)** - Get up and running in 5 minutes
   - Quick commands
   - Access points
   - Common issues

2. **[RUN_APP.md](RUN_APP.md)** - Detailed step-by-step guide to run the app
   - Prerequisites check
   - Installation steps
   - First-time usage
   - Troubleshooting

3. **[CHECKLIST.md](CHECKLIST.md)** - Complete setup verification checklist
   - System requirements
   - Installation verification
   - Feature testing
   - Security checks

## 📖 Documentation Files

### Overview & Architecture
- **[README.md](README.md)** - Project overview and features
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete technical documentation
  - Architecture details
  - Database schema
  - API endpoints
  - Technology stack
  - Data flow diagrams

### Setup & Installation
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Comprehensive setup instructions
  - Prerequisites installation
  - Backend setup
  - Frontend setup
  - Database configuration
  - Environment variables
  - Development tips

### Reference & Commands
- **[COMMANDS.md](COMMANDS.md)** - All commands in one place
  - Installation commands
  - Database commands
  - Backend commands
  - Frontend commands
  - Git commands
  - Troubleshooting commands

## 🎯 Quick Navigation

### I want to...

**...run the application**
→ [RUN_APP.md](RUN_APP.md) or [QUICK_START.md](QUICK_START.md)

**...understand the architecture**
→ [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

**...set up from scratch**
→ [SETUP_GUIDE.md](SETUP_GUIDE.md)

**...find a specific command**
→ [COMMANDS.md](COMMANDS.md)

**...verify my installation**
→ [CHECKLIST.md](CHECKLIST.md)

**...troubleshoot an issue**
→ [RUN_APP.md](RUN_APP.md#troubleshooting) or [SETUP_GUIDE.md](SETUP_GUIDE.md#troubleshooting)

**...understand the API**
→ http://localhost:8000/docs (when backend is running)

**...learn about features**
→ [README.md](README.md#features)

## 📁 Project Structure

```
researchpilot/
├── 📄 Documentation Files
│   ├── INDEX.md              ← You are here
│   ├── README.md             ← Start here for overview
│   ├── QUICK_START.md        ← Quick reference
│   ├── RUN_APP.md            ← How to run
│   ├── SETUP_GUIDE.md        ← Detailed setup
│   ├── PROJECT_SUMMARY.md    ← Technical docs
│   ├── CHECKLIST.md          ← Verification checklist
│   └── COMMANDS.md           ← Command reference
│
├── 🚀 Startup Scripts
│   ├── start.bat             ← Windows startup
│   └── start.sh              ← Unix startup
│
├── 🐍 Backend (Python/FastAPI)
│   ├── core/                 ← Database, security
│   ├── models/               ← Database models
│   ├── routers/              ← API endpoints
│   ├── schemas/              ← Data validation
│   ├── utils/                ← Utilities
│   ├── main.py               ← FastAPI app
│   ├── test_connection.py    ← DB test
│   ├── init_db.py            ← DB initialization
│   ├── requirements.txt      ← Dependencies
│   └── .env                  ← Configuration
│
└── ⚛️  Frontend (React/TypeScript)
    ├── src/
    │   ├── pages/            ← React pages
    │   ├── App.tsx           ← Main component
    │   ├── api.ts            ← API client
    │   └── main.tsx          ← Entry point
    ├── package.json          ← Dependencies
    └── vite.config.ts        ← Build config
```

## 🎓 Learning Path

### For Beginners
1. Read [README.md](README.md) - Understand what the app does
2. Follow [RUN_APP.md](RUN_APP.md) - Get it running
3. Use [CHECKLIST.md](CHECKLIST.md) - Verify everything works
4. Explore the app - Try all features

### For Developers
1. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Understand architecture
2. Review [SETUP_GUIDE.md](SETUP_GUIDE.md) - Development setup
3. Check [COMMANDS.md](COMMANDS.md) - Useful commands
4. Explore the code - Start with `backend/main.py` and `frontend/src/App.tsx`

### For DevOps
1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md) - Infrastructure requirements
2. Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - System architecture
3. Check [CHECKLIST.md](CHECKLIST.md#deployment-checklist-optional) - Deployment checklist
4. Configure production environment

## 🔧 Technology Stack

### Backend
- **FastAPI** - Python web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **JWT** - Authentication
- **Groq** - AI (Llama 3.3)
- **Sentence Transformers** - Embeddings

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

## 📊 Key Features

1. **User Authentication** - Secure JWT-based auth
2. **Paper Search** - Semantic Scholar API integration
3. **Workspaces** - Organize research papers
4. **Vector Embeddings** - Semantic search
5. **AI Chat** - Context-aware conversations
6. **Conversation History** - Track research discussions

## 🌐 Access Points

When the app is running:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

## 🆘 Getting Help

### Common Issues

**Can't start the app?**
→ Check [RUN_APP.md](RUN_APP.md#troubleshooting)

**Database connection error?**
→ Check [SETUP_GUIDE.md](SETUP_GUIDE.md#database-issues)

**Module not found?**
→ Check [COMMANDS.md](COMMANDS.md#installation-commands)

**Port already in use?**
→ Check [RUN_APP.md](RUN_APP.md#port-already-in-use)

### Troubleshooting Steps

1. Check if PostgreSQL is running: `pg_isready`
2. Verify dependencies are installed
3. Check environment variables in `.env`
4. Review error logs in terminal
5. Check browser console for frontend errors
6. Test API at http://localhost:8000/docs

## 📝 Quick Commands

```bash
# Start app (Windows)
start.bat

# Start backend
cd backend && uvicorn main:app --reload

# Start frontend
cd frontend && npm run dev

# Test database
cd backend && python test_connection.py

# Install dependencies
cd backend && pip install -r requirements.txt
cd frontend && npm install
```

## 🎯 Next Steps

After reading this index:

1. **First time?** → Go to [RUN_APP.md](RUN_APP.md)
2. **Want details?** → Go to [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
3. **Need commands?** → Go to [COMMANDS.md](COMMANDS.md)
4. **Ready to code?** → Explore the codebase

## 📚 Additional Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **PostgreSQL**: https://www.postgresql.org/docs/
- **Groq API**: https://groq.com/
- **Semantic Scholar**: https://www.semanticscholar.org/

## 📄 File Descriptions

| File | Purpose | When to Use |
|------|---------|-------------|
| INDEX.md | Documentation index | Finding the right doc |
| README.md | Project overview | Understanding the project |
| QUICK_START.md | Quick reference | Fast lookup |
| RUN_APP.md | Running guide | Starting the app |
| SETUP_GUIDE.md | Setup instructions | First-time setup |
| PROJECT_SUMMARY.md | Technical docs | Understanding architecture |
| CHECKLIST.md | Verification list | Testing installation |
| COMMANDS.md | Command reference | Finding commands |

## 🎉 Ready to Start?

Choose your path:

**🚀 Quick Start** (5 minutes)
```bash
start.bat
```
Then open http://localhost:5173

**📖 Detailed Setup** (30 minutes)
1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Follow all steps
3. Use [CHECKLIST.md](CHECKLIST.md) to verify

**🔍 Deep Dive** (1-2 hours)
1. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
2. Explore the codebase
3. Experiment with features
4. Modify and extend

---

**Need help?** Check the troubleshooting sections in any documentation file.

**Found a bug?** Check the logs and error messages, then review the troubleshooting guides.

**Want to contribute?** Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) to understand the architecture.

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: ✅ Complete and Ready
