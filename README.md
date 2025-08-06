# 🌐 ConnectSphere

A mini LinkedIn-style community platform that enables users to create posts, view a public feed, and visit profile pages. Built with a modern full-stack setup using React, TypeScript, Tailwind CSS, Express, and Firebase Authentication.

---

## 🚀 Live Demo
-https://proconnect-9oit.onrender.com
---

## 🧰 Stack Used

### 💻 Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- React Router

### 🔧 Backend
- Node.js + Express
- TypeScript
- Firebase Admin SDK (JWT-based Auth)
- CORS, dotenv

### ☁️ Deployment
- **Frontend**: Vercel
- **Backend**: Render

---

## ⚙️ Setup Instructions

### 🔐 Prerequisites
- Node.js v18 or later
- Firebase Service Account (base64 encoded JSON)
- GitHub account

---

### 📦 Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following:

```
PORT=3000
FIREBASE_KEY_BASE64=your_base64_encoded_firebase_json
```

> Tip: You can use `cat firebase-adminsdk.json | base64` to encode your Firebase JSON key.

**Run in development:**
```bash
npm run dev
```

**Build and run in production:**
```bash
npm run build
npm start
```

---

### 🖥️ Frontend Setup

```bash
cd client
npm install
npm run dev
```

**Build for production:**
```bash
npm run build
```

---

## 🔐 Demo Login

| Email              | Password     | Role     |
|--------------------|--------------|----------|
| `demo@connectsphere.com` | `demouser123` | Regular User |

*(Or sign up using your own credentials.)*

---

## 🧩 Features

- 🔐 Firebase Authentication (token-based)
- 📰 Public post feed
- 👤 Profile pages
- 🧭 Protected routes (auth middleware)
- ⚡ Fast Vite frontend
- 🎨 Responsive Tailwind UI
- 🌍 Fully deployed on Vercel + Render

---

## 📁 Project Structure

```
/client          → Frontend (React + Vite)
/server          → Backend (Express + TS)
/shared          → Shared types/interfaces
/attached_assets → Assets like icons/images
```

---

## 🤝 License

MIT – feel free to use, modify, and share.

---

> Built with ❤️ by Harshvardhan Singh
