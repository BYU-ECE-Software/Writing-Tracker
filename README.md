# 📚 BYU ECE Writing Tracker

A habit-tracking web app commissioned by Cammy and James from the MAGICC Lab to **gamify writing** and monitor lab members' writing activity.

---
## 📑 Documentation

- [User Guide](./docs/USER_GUIDE.md)  
- [Code Documentation](./docs/CODE_DOCS.md)  
- [Developer Documentation](./docs/DEV_DOCS.md)  
---

## 🛠 Tech Stack

- **Frontend:** Vue 3, PrimeVue 4, TailwindCSS  
- **Backend:** Node.js, Express  
- **Package Manager:** NPM

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/BYU-ECE-Software/Writing-Tracker
cd Writing-Tracker
```
### 2. Start the Frontend

Open a terminal and run:
```
cd frontend
pnpm install
pnpm run dev
```

### 3. Start the Backend

Open a second terminal and run:
```
cd backend
pnpm install
node server.js
```
You should now be able to navigate to the provided frontend URL (typically http://localhost:5173) to use the app.

### 🔒 Environment Variables

Copy .env.example to .env in the project root and configure as needed:

VITE_API_URL=http://localhost:5000/api
VITE_APP_ENV=development

---

## 🚀 Quick Start

### Requirements
- Node.js vXX
- npm or yarn

### Setup
```bash
# Clone repo
git clone <repo-url>
cd project-folder

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

👥 Authors

    @romanvish
    @michaelkane

🤝 Contributing

Contributions are welcome! To contribute:

    Fork the repository

    Create a new branch (git checkout -b feature/some-feature)

    Commit your changes (git commit -m 'Add some feature')

    Push to the branch (git push origin feature/some-feature)

    Open a pull request

Please follow BYU branding guidelines when applicable.
❓ FAQ

Does this work yet?

    Not yet.

Will it work soon?

    We're optimistic. Stay tuned!