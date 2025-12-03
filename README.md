# 🚀 CodeCache – Full-Stack Developer Knowledge Vault  
**Author:** Aliya Aftab  
**Live App:** https://code-cache-amber.vercel.app/

CodeCache is a secure, centralized knowledge vault built using the **MERN stack**.  
It helps developers permanently save, search, and organize their coding knowledge — without losing snippets across platforms, notes, or tabs.

---

# 🌟 Why CodeCache?

Developers often struggle with scattered notes and repeated Google searches.  
CodeCache solves this by providing:

- ✔ A **private code vault**  
- ✔ Multi-tenant **data isolation** (each user sees ONLY their snippets)  
- ✔ Powerful **tag + title search**  
- ✔ Smooth, responsive **dark mode UI**  
- ✔ Full-stack CI/CD with Vercel + Render  

---

# 📸 Screenshots (Quick Look)

### 🔥 Dashboard  
![Dashboard Screenshot](Screenshot%202025-12-01%20223401.png)

### 📝 Create Snippet Form  
![Form Screenshot](Screenshot%202025-12-01%20223517.png)

### 🔎 Search & Tag Filtering  
![Search Screenshot](Screenshot%202025-12-01%20223718.png)

---

# 🏗️ Tech Stack (MERN Architecture)

| Component | Technology | Role & Deployment |
|----------|------------|------------------|
| **Frontend (R)** | React.js (Vite) | UI, state, deployed on Vercel |
| **Backend (E/N)** | Node.js + Express.js | REST API, deployed on Render |
| **Database (M)** | MongoDB Atlas | NoSQL cloud DB |
| **Styling** | Tailwind CSS | Modern UI |

---

# ⚙️ System Architecture Overview

### **Two-Tier Deployment**
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  
- Fully configured **CORS** for safe communication  

---

# ✨ Core Engineering Features

## 🔐 1. Private Vault Architecture  
- Snippets tagged with **owner ID**  
- Backend filters data by username  
- Ensures **zero leakage** across users  

---

## ⚡ 2. Asynchronous UX State Handling  
- Save button shows **"SAVING DATA..."**  
- Button disabled during save  
- Form resets after commit  
- UI refreshes with `fetchSnippets()`  

---

## 🔎 3. Data Cleaning + Fast Search  
- Converts `"react, hooks"` → `["react", "hooks"]`  
- Instant client-side search  
- Filters via **title** and **tags**  

---

# 🎯 Conclusion

CodeCache is a complete solution for developers to securely store, organize, and search their code snippets and notes.  
It demonstrates efficient full-stack practices, including:

- Secure multi-tenant data management  
- Asynchronous state handling for smooth UX  
- Fast client-side search and data normalization  
- Modern responsive UI with Tailwind CSS  
- Full deployment with Vercel (frontend) and Render (backend)  

This project serves as a production-ready MERN application showcasing best practices in full-stack development and real-world deployment workflows.
