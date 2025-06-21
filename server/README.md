# 🚀 Job Importer System

This is a MERN stack application that fetches jobs from multiple XML-based APIs, processes them using a Redis queue (Bull), stores them in MongoDB, and provides a frontend dashboard to track import history.

---

## 📦 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas)
- **Queue**: Redis + Bull

---

## 🔧 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/job-importer.git
cd job-importer

### 1. Clone the repo
cd server
npm install

Create a `.env` file inside the `server/` folder:

Create a .env file inside the server folder:
PORT=5000
MONGO_URI=your_mongo_uri
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password

Start the server:
npm run dev

### 3. Setup Frontend
cd ../client
npm install
npm start

### Features
Fetch jobs from multiple XML feeds

Converts XML to JSON and normalizes data

Queues and processes jobs using Bull + Redis

Stores jobs in MongoDB

Tracks import logs (new, updated, failed)

Displays logs on frontend

### API
GET /api/import-logs — Returns latest 50 import logs

### Deployment
Frontend: Vercel (optional)

Backend: Render or any Node hosting

DB: MongoDB Atlas

Redis: Redis Cloud