# CognivexaAI Backend Infrastructure

Enterprise-grade Node.js/Express backend for the CognivexaAI platform. This system handles complex orchestration between AI services, communication pipelines, and administrative workflows.

## 🏛 Architecture

The backend follows a service-oriented architecture designed for scalability and maintainability.

- **Controllers**: Handle HTTP request parsing and response formatting.
- **Services**: Encapsulate business logic, database interactions, and third-party integrations (OpenAI, Google, Resend).
- **Models**: Mongoose schemas with strictly defined data structures and validation.
- **Middleware**: Security hardening, JWT authentication, and global error handling.
- **Workers**: Asynchronous job processing using BullMQ and Redis (Email queues, cleanup tasks).

## 🛠 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js (ES Modules)
- **Database**: MongoDB (Mongoose ODM)
- **Cache/Queue**: Redis (ioredis, BullMQ)
- **Security**: Helmet, CORS, XSS-Clean, MongoDB-Sanitize
- **Real-time**: Socket.io
- **Integrations**: OpenAI, Resend, Twilio, Stripe, Razorpay, Google APIs

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Instance
- Redis Instance

### Installation
```bash
npm install
```

### Environment Setup
Copy `.env.example` to `.env` and fill in the required credentials. Note that many services (Calendar, WhatsApp, AI) require valid API keys to function in production.

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## 📡 Core API Modules (v1)

### /admin
Command center operations, workforce management, and platform lifecycle controls.

### /inquiries
Lead capture system with status transitions, assignment logic, and **AI scoring** via `/inquiries/:id/ai-score`.

### /bookings
Strategy call orchestration. Integrates with **Google Meet** and **Calendar** for automated scheduling.

### /cms
Dynamic content management for the public frontend (Services, Portfolio, Pricing, Teams).

### /client
Client portal infrastructure for project tracking and financial operations.

## 🐳 Docker Support

The backend is fully containerized. Use the provided Dockerfile and docker-compose for local or production deployment.

```bash
# Build and start services
docker-compose up --build -d
```

## 📜 Logging & Monitoring
- **Pino**: High-performance JSON logging for production.
- **Winston**: Daily rotate logs for audit trails.
- **Sentry**: Real-time error tracking and performance monitoring.

---
*Enterprise AI Backend by CognivexaAI.*
