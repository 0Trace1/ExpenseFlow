# ExpenseFlow

Track your spending with clarity and reliability.

---

## 📌 Overview

ExpenseFlow is a minimal full-stack expense tracking application built with **React (TypeScript)** and **NestJS (TypeScript)**.

The system is designed to behave correctly under real-world conditions such as:

* network retries
* duplicate submissions
* page refreshes

Users can create, view, filter, and sort expenses while seeing a running total of their spending.

---

## ✨ Features

* Add new expense (amount, category, description, date)
* View list of expenses
* Filter by category
* Sort by date (newest first)
* View total of displayed expenses
* Idempotent API to prevent duplicate entries
* Input validation (frontend + backend)
* Loading states and error handling
* Toast notifications for user feedback

---

## 🧱 Tech Stack

### Frontend

* React (TypeScript)
* Vite
* React Toastify

### Backend

* NestJS (TypeScript)
* Sequelize ORM
* PostgreSQL

---

## 📂 Project Structure

```
expenseflow/
  backend/   → NestJS API
  frontend/  → React UI
```

---

## ⚙️ Getting Started

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd expenseflow
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=expenseflow
```

Start backend:

```bash
npm run start:dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

Backend will run on:

```
http://localhost:3000
```

---

## 🌐 API

### POST /expenses

Create a new expense.

**Headers**

```
Idempotency-Key: <unique-key>
```

**Body**

```json
{
  "amount": 100,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-04-24"
}
```

---

### GET /expenses

Supports query params:

* `category`
* `sort=date_desc`

Example:

```
/expenses?category=Food&sort=date_desc
```

---

## 🧠 Key Design Decisions

### Idempotency Handling

To handle retries and duplicate submissions, the API requires an `Idempotency-Key`.
If the same request is sent multiple times with the same key, the backend returns the previous response instead of creating duplicate records.

---

### Database Choice: PostgreSQL

PostgreSQL was chosen for its reliability and strong transactional guarantees.

* Ensures **data consistency (ACID compliance)**
* Supports **precise numeric types (DECIMAL)** for handling money
* Well-suited for real-world production systems

This is important because expense tracking involves financial data where correctness is critical.

---

### Money Handling

Amounts are stored using a **decimal type** to avoid floating-point precision issues.

---

### Architecture

The backend follows a clean separation:

* Controller → handles HTTP
* Service → business logic
* Models → database layer

This keeps the system easy to extend and maintain.

---

## ⚖️ Trade-offs

* No authentication or multi-user support
* No pagination (kept simple for assignment scope)
* Minimal UI styling (focus on correctness and behavior)
* Basic validation instead of exhaustive validation rules

---

## 🚧 Future Improvements

* Category-based analytics (totals per category)
* Pagination for large datasets
* Authentication and user accounts
* Improved UI/UX and accessibility
* Caching for performance

---

## 🔐 Environment Variables

An example configuration is provided:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=expenseflow
```

👉 Copy this into a `.env` file in the backend directory.

---

## 🚀 Live Demo

(Add deployed link here if available)

---

## 👤 Author

Manish BS
