# Developer Documentation


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

# Copy environment file
cp .env.example .env

#.env.example

### ================================
### 🌍 Environment Configuration
### ================================

### API base URL
### Example: http://localhost:5000/api
VITE_API_URL=http://localhost:5000/api

### Application environment
### Options: development | production
VITE_APP_ENV=development

### ================================
### 🔒 Authentication / Security
### (Uncomment and configure if needed)
### ================================

### VITE_AUTH_SECRET=your-secret-key
### VITE_AUTH_PROVIDER=local

