# Developer Documentation

## Tech Stack
- **Frontend:** Vue 3 + PrimeVue + Vite
- **Backend API:** Node.js + Express (assumed)
- **Database:** (insert your DB here)
- **Styling:** TailwindCSS + PrimeVue

## Requirements
- Node.js vXX
- npm or yarn

## Setup Instructions
```bash
# Clone repo
git clone <repo-url>
cd project-folder

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

#.env.example

# ================================
# 🌍 Environment Configuration
# ================================

# API base URL
# Example: http://localhost:5000/api
VITE_API_URL=http://localhost:5000/api

# Application environment
# Options: development | production
VITE_APP_ENV=development

# ================================
# 🔒 Authentication / Security
# (Uncomment and configure if needed)
# ================================

# VITE_AUTH_SECRET=your-secret-key
# VITE_AUTH_PROVIDER=local

