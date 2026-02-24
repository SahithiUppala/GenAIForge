@echo off
REM ResearchPilot AI Startup Script for Windows

echo.
echo ========================================
echo   ResearchPilot AI - Startup Script
echo ========================================
echo.

REM Check if PostgreSQL is running
echo [1/4] Checking PostgreSQL...
pg_isready -q
if errorlevel 1 (
    echo [ERROR] PostgreSQL is not running!
    echo Please start PostgreSQL service from Windows Services
    echo Or run: net start postgresql-x64-XX
    pause
    exit /b 1
)
echo [OK] PostgreSQL is running
echo.

REM Start Backend
echo [2/4] Starting Backend (FastAPI)...
cd backend
start "ResearchPilot Backend" cmd /k "pip install -r requirements.txt && uvicorn main:app --reload --host 0.0.0.0 --port 8000"
echo [OK] Backend starting on http://localhost:8000
echo.

REM Wait for backend
echo [3/4] Waiting for backend to initialize...
timeout /t 8 /nobreak > nul
echo.

REM Start Frontend
echo [4/4] Starting Frontend (React + Vite)...
cd ..\frontend
start "ResearchPilot Frontend" cmd /k "npm install && npm run dev"
echo [OK] Frontend starting on http://localhost:5173
echo.

echo ========================================
echo   ResearchPilot AI is starting!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Close the terminal windows to stop the services
echo.
pause
