Smart AI Personal Trainer (Expo + React Native)

Prerequisites
- Node 18+
- Expo CLI (optional): npm i -g expo

Setup
1) Install deps: npm install
2) Copy env: cp .env.example .env
3) Start app: npm run android or npm run web

Backend (optional)
- cd backend && python -m venv .venv && source .venv/bin/activate
- pip install -r requirements.txt
- uvicorn main:app --reload --port 8000

Features
- Onboarding with profile store (Zustand + AsyncStorage)
- AI workout generator (local) + API client
- Workout guidance, logging, and progress chart
- Notifications service for reminders
