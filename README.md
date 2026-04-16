# Velora

> A Trust-First Matrimony + Social Networking Platform

<img width="1254" height="1254" alt="Velora Matrimony n Dating" src="https://github.com/user-attachments/assets/82033303-f6ec-45a4-be83-29dcbd8e6979" />
Velora is a next-generation platform that combines the depth of traditional matrimony systems with the engagement of modern social media. It is designed to create **authentic, verified, and meaningful connections** between individuals and families.

---

## 🚀 Vision

To build a **globally scalable, trust-centric matchmaking ecosystem** that eliminates fake profiles, enhances compatibility, and enables serious relationships.

---

## ✨ Key Highlights

- 🔐 100% Verified Profiles (Aadhaar + PAN + AI)
- 💬 Free Messaging & Calls (No paywall)
- 🧠 AI-Powered Matchmaking
- 👨‍👩‍👧 Family-Oriented Profiles
- 📱 Social Media Integration (Reels, Posts, Groups)
- 💍 Wedding Marketplace Integration

---

## 🧩 Core Features

### 1. Trust & Verification
- Aadhaar-based KYC
- PAN verification
- AI face match system
- Verified badge system
- Optional physical verification (on-demand)

---

### 2. Hybrid Profile System

#### Matrimonial Data
- Religion, caste, gotra
- Family background
- Education & job
- Salary range
- Lifestyle preferences
- Kundali generation

#### Social Data
- Photos & reels
- Bio & interests
- Activity feed

#### Professional Data
- Job role & company
- Skills & experience
- Employment status

---

### 3. Communication System
- Unlimited messaging (free)
- Audio & video calls
- Media sharing (images, files, videos)
- Read receipts
- Real-time chat (WebSockets)

---

### 4. Smart Matchmaking
- AI compatibility scoring
- Cultural + professional matching
- Interest-based recommendations
- Kundali matching

---

### 5. Multi-User Roles
- Male (looking for female)
- Female (looking for male)
- Parent/Guardian (manage profiles)

---

### 6. Community Features
- Groups & forums
- Interest-based communities
- Events & meetups

---

### 7. Wedding Marketplace
- Venue listings
- Caterers & decorators
- Photographers
- Budget comparison tools

---

## 💰 Monetization Plans

### 🟢 Basic Plan – ₹100/month
- Unlimited messaging
- Profile views insights
- Verified badge
- 30 reels/month
- AI astrologer
- Wedding planner access

---

### 🔵 Prime Plan – ₹300/month
- Everything in Basic +
- Profile boost
- Advanced filters
- Unlimited reels
- Priority ranking

---

### 🟣 Ultimate Plan – ₹500/month
- Everything in Prime +
- Physical verification request
- Personal matchmaking assistant
- Background verification reports
- Premium badge

---

## 🧠 AI Capabilities

- Fake profile detection
- AI matchmaking engine
- AI astrologer
- Chat assistant
- Behavioral analysis for safety

---

## 🏗️ Tech Stack

### Frontend
- Next.js (React)
- React Native / Flutter

### Backend
- Node.js (NestJS) / Spring Boot
- REST + GraphQL APIs

### Database
- PostgreSQL (Relational)
- MongoDB (Content)
- Redis (Caching)

### Realtime
- Socket.io (WebSockets)
- WebRTC (Audio/Video Calls)

### AI/ML
- Python (FastAPI)
- TensorFlow / PyTorch

### Cloud & DevOps
- AWS / GCP
- Docker + Kubernetes
- GitHub Actions (CI/CD)

---

## 📁 Project Structure
```
velora/
│
├── apps/
│ ├── web/ # Next.js frontend
│ ├── mobile/ # React Native / Flutter app
│ └── api/ # Backend services
│
├── services/
│ ├── auth/ # Authentication & KYC
│ ├── matching/ # AI matchmaking
│ ├── chat/ # Messaging service
│ ├── media/ # File uploads
│ └── payments/ # Subscription system
│
├── infra/
│ ├── docker/
│ ├── kubernetes/
│ └── ci-cd/
│
└── docs/
├── architecture.md
├── api-spec.md
└── roadmap.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js >= 18
- Docker
- PostgreSQL
- Redis

---

### Clone Repository

```bash
git clone https://github.com/velora/velora.git
cd velora
```

Install Dependencies
```
npm install
```
Environment Variables

Create a .env file:
```
DATABASE_URL=postgresql://user:password@localhost:5432/velora
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
```

Run Development Server
```
npm run dev
```

🔐 Security & Compliance
- End-to-end encrypted messaging
- Data privacy compliance (India DPDP Act)
- Secure KYC integrations
- Report & safety mechanisms
- Fraud detection systems
  
🛣️ Roadmap

Phase 1 (MVP)
- User registration
- Profile system
- Messaging
  
Phase 2
- AI matchmaking
- Verification system
- Subscription plans

Phase 3
Wedding marketplace
Global expansion
Advanced AI features
⚠️ Challenges
Legal compliance (KYC & privacy)
Scalability for millions of users
Fraud & fake profile detection
User safety & moderation
🤝 Contribution
Fork the repository
Create a new branch
Make changes
Submit a pull request
📄 License

MIT License

📢 Disclaimer

Velora is built to promote genuine relationships. Any misuse or fraudulent activity will lead to strict action including account suspension.
