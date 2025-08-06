# 📝 Real-time Collaborative Note-Taking App

A lightweight real-time note-taking application where multiple users can edit the same document simultaneously — no login required!

## 🚀 Features

- 🧠 Collaborative editing via **Socket.IO**
- 📄 Markdown + Task list support
- ✅ Live checkbox updates (e.g. `- [x] Task done`)
- 🔄 Auto-saving to MongoDB every 5 seconds
- 👥 Active collaborator count per note
- 🕒 Display of “Last saved” time
- 🌐 No authentication required

---

## 🧑‍💻 Tech Stack

| Layer     | Tech                     |
|-----------|--------------------------|
| Frontend  | React + Vite + TailwindCSS |
| Backend   | Node.js + Express        |
| DB        | MongoDB Atlas            |
| Realtime  | Socket.IO                |
| Markdown  | react-markdown-editor-lite |
| Hosting   | Vercel (Frontend), Render (Backend) |

---

## 📁 Folder Structure

collab-notes/
├── client/ # React frontend
└── server/ # Node + Express backend

📲 2. Setup Backend
bash
Copy
Edit
cd server
npm install

🔐 Create .env file
env
Copy
Edit
MONGO_URI=your_mongo_connection_string
PORT=5000

💻 3. Setup Frontend
bash
Copy
Edit
cd ../client
npm install

▶️ Start Frontend
bash
Copy
Edit
npm run dev


