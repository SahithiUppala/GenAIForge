# ResearchPilot AI - Academic Research Assistant

An AI-powered research assistant that helps you search, organize, and analyze academic papers using semantic search and AI chat capabilities.

## Features

- **User Authentication**: Secure JWT-based authentication
- **Paper Search**: Search academic papers via Semantic Scholar API
- **Workspaces**: Organize papers into personal workspaces
- **AI Chat**: Chat with AI (Groq Llama 3.3) to analyze papers and get insights
- **Vector Embeddings**: Semantic search using sentence transformers
- **Conversation History**: Track your research conversations

## Tech Stack

### Backend
- FastAPI (Python web framework)
- PostgreSQL (Database)
- SQLAlchemy (ORM)
- JWT Authentication
- Groq API (Llama 3.3 70B)
- Sentence Transformers (Embeddings)
- Semantic Scholar API

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- React Router (Navigation)
- Axios (API calls)
- Tailwind CSS (Styling)
- Lucide React (Icons)

## Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL 12+
- pip (Python package manager)
- npm (Node package manager)

## Installation & Setup

### 1. Database Setup

Make sure PostgreSQL is installed and running. Create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE researchpilot;

# Exit
\q
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# The .env file is already configured with:
# - DATABASE_URL (PostgreSQL connection)
# - SECRET_KEY (JWT secret)
# - GROQ_API_KEY (AI API key)
# - Other configuration

# Run the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: http://localhost:8000

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will be available at: http://localhost:5173

## Usage

1. **Register**: Create a new account at http://localhost:5173/register
2. **Login**: Sign in with your credentials
3. **Search Papers**: Use the search feature to find academic papers
4. **Create Workspace**: Organize papers into workspaces
5. **Import Papers**: Add papers to your workspace
6. **Chat with AI**: Ask questions about your papers

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
researchpilot/
├── backend/
│   ├── core/           # Database, security, dependencies
│   ├── models/         # SQLAlchemy models
│   ├── routers/        # API endpoints
│   ├── schemas/        # Pydantic schemas
│   ├── utils/          # Embeddings, Groq client
│   ├── main.py         # FastAPI app
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/      # React pages
│   │   ├── App.tsx     # Main app component
│   │   ├── api.ts      # API client
│   │   └── main.tsx    # Entry point
│   └── package.json
└── README.md
```

## Environment Variables

The `.env` file in the backend directory contains:

```env
DATABASE_URL=postgresql://postgres:97050019801042@localhost:5432/researchpilot
SECRET_KEY=supersecretkey123456789
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
GROQ_API_KEY=your_groq_api_key_here
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check if database `researchpilot` exists

### Port Already in Use
- Backend: Change port in uvicorn command
- Frontend: Vite will automatically suggest another port

### Module Not Found
- Backend: Run `pip install -r requirements.txt`
- Frontend: Run `npm install`

## License

MIT License
