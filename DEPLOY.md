# FurMatch Deployment Guide

## Local Development

### 1. Backend (NestJS)
```bash
cd backend
cp .env.example .env
# Edit .env — set your ANTHROPIC_API_KEY
npm run start:dev
# Runs on http://localhost:3001
```

### 2. Frontend (React + Vite)
```bash
cd frontend
# .env already points to http://localhost:3001
npm run dev
# Runs on http://localhost:5173
```

Test it: open http://localhost:5173, fill in a pet profile, generate a plan.

---

## Deploy Backend → Railway (free tier)

1. Go to https://railway.app → New Project → Deploy from GitHub Repo
2. Select your repo → choose the `backend` folder as root
3. Set these environment variables in Railway dashboard:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   PORT=3001
   ```
4. Railway auto-detects NestJS and runs `npm run start:prod`
5. Copy your Railway public URL (e.g. `https://furmatch-backend.up.railway.app`)

---

## Deploy Frontend → Vercel (free tier)

1. Go to https://vercel.com → New Project → Import your repo
2. Set Root Directory to `frontend`
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Add environment variable:
   ```
   VITE_API_URL=https://your-railway-backend-url.up.railway.app
   ```
6. Deploy → get your live URL (e.g. `https://furmatch.vercel.app`)

---

## Test on Mobile

Open the Vercel URL on your phone. The app is designed for 390px width — it looks native on iPhone.

---

## Share with Katherine

Send this message on LinkedIn:

> Hi Katherine! I built a demo called FurMatch — an AI pet nutrition companion that generates personalised Furchild meal plans. Would love for you to try it: [your Vercel URL]
> It uses the Claude AI API on a NestJS backend with a React frontend. Took about a day to build. Happy to walk you through the code!
