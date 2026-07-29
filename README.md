# Abhinav Jindal - Data Science Engineer Portfolio

A premium, highly interactive portfolio website built for a **Data Science Engineer** using the **MERN Stack** (MongoDB, Express, React, Node.js) and **Three.js** (for 3D neural constellation graphics). It features a distinct **Tech Geek / Cybernetic Theme** with fluid Dark/Light modes and a retro Developer CLI Terminal Simulator.

---

## 🧬 Key Features

* **3D Particle Constellation:** Custom-designed, interactive 3D nodes (simulating neural networks) that rotate and respond to mouse-parallax coordinates, shifting colors dynamically with the active theme.
* **Dual-Interface Architecture:**
  * **Visual Dashboard (GUI Mode):** Glassmorphic widgets, structured project logs with validation metrics (Silhouette score, precision, relevance), chronological work experience graphs, and responsive academic timelines.
  * **Interactive Terminal (CLI Mode):** A retro developer CLI command line environment allowing users to type commands (e.g. `help`, `skills` for an ASCII skill tree, `ls` / `project 1`, `contact`) to query data directly.
* **Secure Mail Gateway:** Dynamic contact form validating payload parameters, uploading details to a server database, and supporting SMTP email alerts.
* **Resilient Storage Fallback:** If MongoDB is offline, the Express API routes automatically bypass crashes and append contact inquiries to a local JSON file (`server/messages.json`).
* **Multi-Device Responsiveness:** Fully fluid styles optimized for PC, laptops, tablets, and mobile portrait dimensions.

---

## 🛠️ Technology Stack

* **Frontend:** React, Vite, Vanilla CSS3 (Custom Design System), Three.js (3D engine), Lucide Icons.
* **Backend:** Node.js, Express.js (REST API, Static serving middleware), NodeMailer (SMTP notifications).
* **Database:** MongoDB (via Mongoose ODM) with offline filesystem fallback.
* **Concurrence & Orchestration:** `concurrently` (boots client & server in a single terminal).

---

## 📁 Repository Structure

```
Portfolio/
├── package.json          # Root scripts to install and run concurrently
├── DEPLOYMENT.md         # Step-by-step production cloud deployment instructions
├── README.md             # Project documentation and developer guide
├── server/               # Node.js + Express backend
│   ├── server.js         # Main server and production file-server middleware
│   ├── package.json
│   ├── .env.example
│   ├── models/           # Mongoose schemas
│   └── routes/           # API routes
└── client/               # React + Vite frontend
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── index.css     # Dark/Light CSS variables & CRT filter overlay
        ├── App.jsx       # Layout, scroll spy, and state hook orchestration
        ├── data/         # Structured CV profile data
        └── components/   # Modular React widgets (GUI, CLI, 3D Canvas, Contact)
```

---

## 🚀 Local Quickstart

### 1. Clone the repository
```bash
git clone https://github.com/ABHINAVJINDAL26/Ai-ml_Portfolio.git
cd Ai-ml_Portfolio
```

### 2. Install dependencies (Workspace Monorepo)
Installs packages for root, client, and server in one command:
```bash
npm run install-all
```

### 3. Setup configuration variables
Copy the template `.env` file in the server directory and configure your ports:
```bash
cp server/.env.example server/.env
```

### 4. Boot development servers
Starts the React client on `http://localhost:5173/` and Express API on `http://localhost:5000/` concurrently:
```bash
npm run dev
```

---

## 💻 CLI Terminal Instructions
When in `CLI_MODE`, type these queries inside the retro CRT command prompt:

* `help` - Show the instruction panel.
* `about` / `bio` - Print professional profile summary.
* `skills` - Render a full hierarchical ASCII skill tree.
* `ls` / `projects` - List all projects.
* `project <number>` - Inspect project metrics and logs (e.g. `project 1`).
* `experience` - Print work history logs.
* `certs` - List certificates.
* `contact` - Display connection channels.
* `gui` - Return back to the graphical dashboard dashboard.
* `clear` - Clear console history.

---

## ☁️ Production Deployment

To host this live on **Render** (Web Service) and **MongoDB Atlas** (Cloud Database), refer to the detailed instructions in [DEPLOYMENT.md](file:///c:/Users/jabhi/Desktop/Portfolio/DEPLOYMENT.md).

---

## 📬 Contact Credentials

* **Author:** Abhinav Jindal
* **Email:** [jabhinav198@gmail.com](mailto:jabhinav198@gmail.com)
* **LinkedIn:** [Abhinav Jindal](https://www.linkedin.com/in/abhinav--jindal/)
* **GitHub Profile:** [AbhinavJindal](https://github.com/ABHINAVJINDAL26)
