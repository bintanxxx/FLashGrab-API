# ⚡ FlashGrab API

Backend system engineered to handle **High Concurrency Flash Sale** events. Built to demonstrate handling **Race Conditions**, **Database Locking**, and **ACID Transactions**.

## 🛠 Tech Stack

- **Runtime:** Node.js & Express
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase/Neon)
- **ORM:** Prisma
- **Validation:** Zod
- **Auth:** JWT (JSON Web Token) & Bcrypt

## 🚀 Current Features (Sprint 1)

- **Authentication:**
  - Register (Auto role: USER)
  - Login (Returns JWT with Role payload)
  - Secure Password Hashing
- **Voucher Management (Admin Only):**
  - Create Voucher with validation (Uniqueness, Date Logic, Stock)
  - Audit Trail (Tracks which Admin created the voucher)
- **Security:**
  - Role-Based Access Control (RBAC) middleware.
  - Type-safe Request handling (No `any`).

## 📦 How to Run

1. **Clone Repository**
   ```bash
   git clone [https://github.com/USERNAME/flashgrab-api.git](https://github.com/USERNAME/flashgrab-api.git)
   cd flashgrab-api
   ```

## 🔌 API Endpoints

Base URL: `http://localhost:3000/api/v1`

| Method       | Endpoint         | Description                    | Access            |
| :----------- | :--------------- | :----------------------------- | :---------------- |
| **AUTH**     |                  |                                |                   |
| `POST`       | `/auth/register` | Register new user              | Public            |
| `POST`       | `/auth/login`    | Login user & get Token         | Public            |
| **VOUCHERS** |                  |                                |                   |
| `GET`        | `/vouchers`      | Get list of available vouchers | Public            |
| `POST`       | `/vouchers`      | Create new voucher (Seeding)   | **Admin Only** 🔐 |

> **Note:** For endpoints with **🔐**, you must include the `Authorization` header:
> `Bearer <your_jwt_token>`
