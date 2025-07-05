# 📚 Library Management System - Frontend

This is the **frontend** for the Minimal Library Management System built with **React**, **TypeScript**, **Redux Toolkit Query**, and **Tailwind CSS**. It allows users to view, add, update, delete, and borrow books, as well as see a borrow summary—all without authentication.

---

## 🎯 Features

✅ View all books in a responsive card grid  
✅ Add a new book  
✅ Edit or delete a book  
✅ Borrow a book (with quantity and due date)  
✅ Borrow summary showing total quantity borrowed per book  
✅ Pagination, sorting, and filtering support  
✅ Toast notifications and form validation  
✅ Responsive UI using Tailwind and ShadCN  

---

## ⚙️ Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Framework    | React, TypeScript             |
| State Mgmt   | Redux Toolkit + RTK Query     |
| Styling      | Tailwind CSS + ShadCN UI      |
| Forms        | React Hook Form + Zod         |
| Routing      | React Router DOM              |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clonehttps://github.com/tanjimN4/Library-Management-FrontEnd
cd frontend
```

API Endpoints Used
GET /books – fetch books (with pagination/filter)

POST /books – add book

PUT /books/:id – update book

DELETE /books/:id – delete book

POST /borrow – borrow a book

GET /borrow – view borrow summary

frontend/
├── components/        # Reusable UI components
├── pages/             # Page components for routes
├── redux/
│   ├── api/           # RTK Query endpoints
│   └── slices/        # Optional Redux slices
├── types/             # TypeScript interfaces
├── App.tsx
├── main.tsx
├── .env.local
└── README.md


UI Highlights
📱 Responsive on mobile, tablet, and desktop

🧠 Typed forms with Zod + React Hook Form

🔔 Toast notifications with ShadCN

💨 Fast API updates via RTK Query (includes invalidation)