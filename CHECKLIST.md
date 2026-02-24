# ✅ ResearchPilot AI - Setup Checklist

## Pre-Installation Checklist

### System Requirements
- [ ] Windows/Mac/Linux operating system
- [ ] 4GB RAM minimum (8GB recommended)
- [ ] 2GB free disk space
- [ ] Internet connection
- [ ] Modern web browser (Chrome, Firefox, Edge, Safari)

### Software Prerequisites
- [ ] Python 3.8 or higher installed
  - Test: `python --version`
- [ ] Node.js 18 or higher installed
  - Test: `node --version`
- [ ] npm package manager installed
  - Test: `npm --version`
- [ ] PostgreSQL 12 or higher installed
  - Test: `psql --version`
- [ ] PostgreSQL service running
  - Test: `pg_isready`

## Database Setup Checklist

- [ ] PostgreSQL service is running
- [ ] Database `researchpilot` created
  - Command: `psql -U postgres -c "CREATE DATABASE researchpilot;"`
- [ ] Can connect to database
  - Test: `psql -U postgres -d researchpilot`
- [ ] Database credentials updated in `backend/.env` (if needed)

## Backend Setup Checklist

- [ ] Navigate to backend directory
  - Command: `cd backend`
- [ ] Python dependencies installed
  - Command: `pip install -r requirements.txt`
- [ ] Environment variables configured in `.env`
  - [ ] DATABASE_URL is correct
  - [ ] SECRET_KEY is set
  - [ ] GROQ_API_KEY is set
- [ ] Database connection tested (optional)
  - Command: `python test_connection.py`
- [ ] Backend server starts successfully
  - Command: `uvicorn main:app --reload`
- [ ] Can access http://localhost:8000
- [ ] Can access API docs at http://localhost:8000/docs

## Frontend Setup Checklist

- [ ] Navigate to frontend directory
  - Command: `cd frontend`
- [ ] Node dependencies installed
  - Command: `npm install`
- [ ] Frontend server starts successfully
  - Command: `npm run dev`
- [ ] Can access http://localhost:5173
- [ ] No console errors in browser

## Application Testing Checklist

### User Authentication
- [ ] Can access login page at http://localhost:5173
- [ ] Can register new account
  - Email: test@example.com
  - Password: testpassword123
- [ ] Registration successful
- [ ] Can login with credentials
- [ ] Redirected to dashboard after login
- [ ] Can see user email in header
- [ ] Can logout successfully

### Dashboard
- [ ] Dashboard loads correctly
- [ ] Can see three feature cards:
  - [ ] Search Papers
  - [ ] Workspaces
  - [ ] AI Chat
- [ ] All navigation links work

### Paper Search
- [ ] Can navigate to Search page
- [ ] Can enter search query
- [ ] Search returns results
- [ ] Results show:
  - [ ] Paper title
  - [ ] Authors
  - [ ] Year
  - [ ] Abstract
  - [ ] Citation count
- [ ] Can view paper details

### Workspace Management
- [ ] Can navigate to Workspace page
- [ ] Can create new workspace
- [ ] Workspace appears in list
- [ ] Can select workspace
- [ ] Can delete workspace

### Paper Import
- [ ] Can search for papers
- [ ] Can select workspace for import
- [ ] Can import paper to workspace
- [ ] Paper appears in workspace
- [ ] Can view paper details in workspace
- [ ] Can delete paper from workspace

### AI Chat
- [ ] Can navigate to Chat page
- [ ] Can select workspace (optional)
- [ ] Can send message
- [ ] AI responds with relevant answer
- [ ] Conversation history displays
- [ ] Can start new conversation
- [ ] Can view conversation list
- [ ] Can delete conversation

## API Testing Checklist

Visit http://localhost:8000/docs and test:

### Auth Endpoints
- [ ] POST /register - Register user
- [ ] POST /login - Login user
- [ ] GET /me - Get current user (requires auth)

### Workspace Endpoints
- [ ] POST /workspace/create - Create workspace
- [ ] GET /workspace/my - Get workspaces
- [ ] DELETE /workspace/{id} - Delete workspace

### Paper Endpoints
- [ ] GET /papers/search - Search papers
- [ ] POST /papers/import - Import paper
- [ ] GET /papers/workspace/{id} - Get workspace papers
- [ ] DELETE /papers/{id} - Delete paper

### Chat Endpoints
- [ ] POST /chat - Send message
- [ ] GET /conversations - Get conversations
- [ ] GET /conversation/{id}/messages - Get messages
- [ ] DELETE /conversation/{id} - Delete conversation

## Performance Checklist

- [ ] Backend responds quickly (< 1 second)
- [ ] Frontend loads quickly (< 2 seconds)
- [ ] Search returns results in reasonable time (< 5 seconds)
- [ ] AI chat responds in reasonable time (< 10 seconds)
- [ ] No memory leaks or crashes
- [ ] Database queries are efficient

## Security Checklist

- [ ] Passwords are hashed (not stored in plain text)
- [ ] JWT tokens expire after 60 minutes
- [ ] Protected routes require authentication
- [ ] CORS is properly configured
- [ ] No sensitive data in console logs
- [ ] Environment variables are not committed to git

## Documentation Checklist

- [ ] README.md exists and is complete
- [ ] SETUP_GUIDE.md provides detailed instructions
- [ ] QUICK_START.md provides quick reference
- [ ] RUN_APP.md explains how to run the app
- [ ] PROJECT_SUMMARY.md describes the project
- [ ] API documentation is accessible at /docs

## Troubleshooting Checklist

If something doesn't work:

### Backend Issues
- [ ] Check if PostgreSQL is running: `pg_isready`
- [ ] Check if database exists: `psql -U postgres -l`
- [ ] Check backend logs in terminal
- [ ] Verify .env file configuration
- [ ] Reinstall dependencies: `pip install -r requirements.txt`
- [ ] Test database connection: `python test_connection.py`

### Frontend Issues
- [ ] Check frontend logs in terminal
- [ ] Check browser console for errors
- [ ] Verify backend is running
- [ ] Reinstall dependencies: `npm install`
- [ ] Clear browser cache
- [ ] Try different browser

### Database Issues
- [ ] Verify PostgreSQL service is running
- [ ] Check database credentials
- [ ] Verify database exists
- [ ] Check PostgreSQL logs
- [ ] Test connection with psql

### API Issues
- [ ] Check if backend is running on port 8000
- [ ] Verify CORS configuration
- [ ] Check API documentation at /docs
- [ ] Test endpoints with Swagger UI
- [ ] Check request/response in browser network tab

## Deployment Checklist (Optional)

For production deployment:

- [ ] Change SECRET_KEY to secure random value
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Use production database
- [ ] Build frontend for production: `npm run build`
- [ ] Use production WSGI server (gunicorn)
- [ ] Set up reverse proxy (nginx)
- [ ] Configure firewall
- [ ] Set up SSL certificate
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up CI/CD pipeline

## Final Verification

- [ ] All features work as expected
- [ ] No errors in console or logs
- [ ] Application is stable
- [ ] Documentation is complete
- [ ] Ready for use!

---

## Quick Start Command

Once everything is checked:

**Windows:**
```bash
start.bat
```

**Manual:**
```bash
# Terminal 1
cd backend
uvicorn main:app --reload

# Terminal 2
cd frontend
npm run dev
```

Then open: http://localhost:5173

---

**Status**: Use this checklist to verify your installation is complete and working correctly.

**Need Help?** Check the documentation files or review the troubleshooting section.
