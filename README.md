# ⚡ FlashGrab API

Backend system engineered to handle **High Concurrency Flash Sale** events using TypeScript and Prisma Transactions.

## 🛠 Tech Stack
- **Runtime:** Node.js & Express
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase/Neon)
- **ORM:** Prisma
- **Validation:** Zod
- **Docs:** Swagger UI

## 🚀 Features
- **Race Condition Handling:** Prevents overselling using Database Locking.
- **Transactional Integrity:** ACID compliance for claim process.
- **RESTful API:** Modular structure.

## 📦 How to Run
1. Clone repository
2. `npm install`
3. Setup `.env` (Database URL)
4. `npx prisma db push`
5. `npm run dev`

## 📖 API Documentation
Visit `http://localhost:3000/api-docs` after running the server.