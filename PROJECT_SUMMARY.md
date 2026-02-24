# ResearchPilot AI - Project Summary

## 📋 Overview

ResearchPilot AI is a full-stack web application that helps researchers search, organize, and analyze academic papers using AI. It combines semantic search, vector embeddings, and conversational AI to provide intelligent research assistance.

## 🏗️ Architecture

### Backend (FastAPI + Python)
- **Framework**: FastAPI (modern, fast Python web framework)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT-based secure authentication
- **AI Integration**: Groq API (Llama 3.3 70B model)
- **Embeddings**: Sentence Transformers (all-MiniLM-L6-v2)
- **External API**: Semantic Scholar for paper search

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast, modern build tool)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Database Schema
```
users
├── id (PK)
├── email (unique)
└── password (hashed)

workspaces
├── id (PK)
├── name
├── owner_id (FK → users)
└── papers (relationship)

papers
├── id (PK)
├── title
├── abstract
├── authors
├── year
├── citations
├── url
├── embedding (JSON vector)
└── workspace_id (FK → workspaces)

conversations
├── id (PK)
├── user_id (FK → users)
├── workspace_id (FK → workspaces)
├── created_at
└── messages (relationship)

messages
├── id (PK)
├── conversation_id (FK → conversations)
├── role (user/assistant)
├── content
└── created_at
```

## 🎯 Key Features

### 1. User Authentication
- Secure registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API endpoints

### 2. Paper Search
- Search academic papers via Semantic Scholar API
- Returns title, abstract, authors, year, citations
- Real-time search results
- Clean, modern UI

### 3. Workspace Management
- Create multiple workspaces
- Organize papers by topic/project
- Import papers from search results
- Delete workspaces and papers

### 4. Vector Embeddings
- Generate embeddings for paper content
- Store embeddings in PostgreSQL (JSON)
- Semantic similarity search
- Find relevant papers based on query

### 5. AI Chat
- Chat with Groq Llama 3.3 70B model
- Context-aware responses using workspace papers
- Conversation history tracking
- Semantic search for relevant papers
- Multi-turn conversations

## 📁 Project Structure

```
researchpilot/
├── backend/
│   ├── core/
│   │   ├── database.py      # Database connection & session
│   │   ├── security.py      # JWT token creation
│   │   └── deps.py          # Dependency injection
│   ├── models/
│   │   ├── user.py          # User model
│   │   ├── workspace.py     # Workspace model
│   │   ├── paper.py         # Paper model
│   │   ├── conversation.py  # Conversation & Message models
│   │   └── schemas.py       # Shared Pydantic schemas
│   ├── routers/
│   │   ├── auth.py          # Authentication endpoints
│   │   ├── workspace.py     # Workspace CRUD
│   │   ├── papers.py        # Paper search & import
│   │   └── chat.py          # AI chat endpoints
│   ├── schemas/
│   │   ├── user.py          # User schemas
│   │   ├── workspace.py     # Workspace schemas
│   │   └── paper.py         # Paper schemas
│   ├── utils/
│   │   ├── embeddings.py    # Vector embedding generation
│   │   └── groq_client.py   # Groq API client
│   ├── main.py              # FastAPI application
│   ├── test_connection.py   # Database connection test
│   ├── init_db.py           # Database initialization
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx        # Login page
│   │   │   ├── Register.tsx     # Registration page
│   │   │   ├── Dashboard.tsx    # Main dashboard
│   │   │   ├── Search.tsx       # Paper search
│   │   │   ├── Workspace.tsx    # Workspace management
│   │   │   └── Chat.tsx         # AI chat interface
│   │   ├── App.tsx              # Main app component
│   │   ├── api.ts               # API client
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Node dependencies
│   ├── vite.config.ts           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   └── tsconfig.json            # TypeScript configuration
├── start.bat                    # Windows startup script
├── start.sh                     # Unix startup script
├── README.md                    # Project overview
├── SETUP_GUIDE.md              # Detailed setup instructions
├── QUICK_START.md              # Quick reference
├── RUN_APP.md                  # How to run the app
├── PROJECT_SUMMARY.md          # This file
└── .gitignore                  # Git ignore rules
```

## 🔌 API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login and get JWT token
- `GET /me` - Get current user info

### Workspaces
- `POST /workspace/create` - Create workspace
- `GET /workspace/my` - Get user's workspaces
- `DELETE /workspace/{id}` - Delete workspace

### Papers
- `GET /papers/search?query=...` - Search papers
- `POST /papers/import` - Import paper to workspace
- `GET /papers/workspace/{id}` - Get workspace papers
- `DELETE /papers/{id}` - Delete paper

### Chat
- `POST /chat` - Send message to AI
- `GET /conversations` - Get user's conversations
- `GET /conversation/{id}/messages` - Get conversation messages
- `DELETE /conversation/{id}` - Delete conversation

## 🔧 Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation
- **python-jose** - JWT implementation
- **passlib** - Password hashing
- **Groq** - AI API client
- **sentence-transformers** - Text embeddings
- **httpx** - HTTP client
- **requests** - HTTP library

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library

## 🚀 How It Works

### 1. User Registration & Login
1. User registers with email/password
2. Password is hashed with bcrypt
3. User logs in and receives JWT token
4. Token is stored in localStorage
5. Token is sent with all API requests

### 2. Paper Search
1. User enters search query
2. Frontend sends request to backend
3. Backend queries Semantic Scholar API
4. Results are formatted and returned
5. User can import papers to workspace

### 3. Paper Import with Embeddings
1. User selects paper to import
2. Backend generates embedding from title + abstract
3. Paper and embedding stored in database
4. Paper appears in workspace

### 4. AI Chat with Context
1. User sends message in chat
2. Backend generates query embedding
3. Finds similar papers using cosine similarity
4. Builds context from relevant papers
5. Sends context + message to Groq API
6. AI response is returned and saved
7. Conversation history maintained

## 📊 Data Flow

```
User → Frontend (React)
  ↓
  API Request (Axios)
  ↓
Backend (FastAPI)
  ↓
  ├→ PostgreSQL (Data Storage)
  ├→ Semantic Scholar API (Paper Search)
  ├→ Sentence Transformers (Embeddings)
  └→ Groq API (AI Chat)
  ↓
Response → Frontend → User
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Token expiration (60 minutes)
- Protected API endpoints
- CORS configuration
- SQL injection prevention (SQLAlchemy)
- Input validation (Pydantic)

## 🎨 UI/UX Features

- Modern, clean design
- Dark theme with gradient accents
- Responsive layout
- Loading states
- Error handling
- Form validation
- Smooth transitions
- Icon-based navigation

## 📈 Performance Optimizations

- Database indexing on email and IDs
- Vector similarity search
- Conversation history limit (10 messages)
- Top-K paper retrieval (3 papers)
- Frontend code splitting
- Vite's fast HMR
- SQLAlchemy connection pooling

## 🔮 Future Enhancements

Potential features to add:
- PDF upload and parsing
- Citation graph visualization
- Collaborative workspaces
- Export to BibTeX/EndNote
- Advanced search filters
- Paper recommendations
- Annotation and highlighting
- Mobile app
- Email notifications
- Social sharing

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# JWT
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# AI
GROQ_API_KEY=your-groq-api-key
```

## 🧪 Testing

### Backend Testing
```bash
# Test database connection
python backend/test_connection.py

# Initialize database
python backend/init_db.py

# Test API endpoints
# Visit http://localhost:8000/docs
```

### Frontend Testing
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Dependencies

### Backend (requirements.txt)
- fastapi==0.104.1
- uvicorn[standard]==0.24.0
- python-dotenv==1.0.0
- groq==0.4.1
- httpx==0.25.2
- python-multipart==0.0.6
- python-jose[cryptography]==3.3.0
- passlib[bcrypt]==1.7.4
- sqlalchemy>=2.0.23
- numpy>=1.24.3
- sentence-transformers>=2.2.2
- requests
- email-validator
- psycopg2-binary>=2.9.9

### Frontend (package.json)
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.22.0
- axios: ^1.6.7
- lucide-react: ^0.344.0
- typescript: ^5.5.3
- vite: ^5.4.1
- tailwindcss: ^3.4.1

## 🎓 Learning Resources

- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- SQLAlchemy: https://www.sqlalchemy.org/
- Tailwind CSS: https://tailwindcss.com/
- Groq: https://groq.com/
- Semantic Scholar: https://www.semanticscholar.org/

## 📄 License

MIT License - Feel free to use and modify

## 👥 Contributing

This is a complete, working application. To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🆘 Support

For issues:
1. Check documentation files
2. Review error logs
3. Test database connection
4. Verify environment variables
5. Check API documentation at `/docs`

---

**Status**: ✅ Complete and Ready to Run

**Last Updated**: 2024

**Version**: 1.0.0
