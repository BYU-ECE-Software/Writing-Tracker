# Code Documentation

## Project Structure
/src
/components -> Reusable Vue components
/views -> Page-level components
/store -> State management
/api -> API service functions
main.js -> Vue app entry point


## Key Functions & Modules

### `/api/user.js`
- **`getUserProfile()`**
  - **Purpose:** Fetch current user details.
  - **Endpoint:** `GET /api/users/profile`
  - **Returns:** `{ id, name, email, role }`

### `/api/logs.js`
- **`logWritingSession(data)`**
  - **Purpose:** Create a new writing session log.
  - **Endpoint:** `POST /api/logs/log`
  - **Input:** `{ date, duration, wordCount, notes }`
  - **Returns:** `{ id, ...log }`

### `/store/user.js`
- **State:** `user`, `isAuthenticated`
- **Mutations/Actions:** login, logout, setProfile

### `/store/logs.js`
- **State:** `logs`
- **Mutations/Actions:** addLog, fetchLogs

---

## Important Variables
- **`isAuthenticated`** – derived state to check login.
- **`logs`** – array of user’s writing sessions.
- **`user`** – current logged-in user object.
