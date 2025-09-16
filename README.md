# User Management Dashboard

## Overview
A full-stack user management application with a React + Vite + Tailwind frontend and an Express + SQLite backend. Supports adding, editing, deleting, and viewing users with validation and responsive UI.

---

## Frontend

### Technologies
- React (Vite)
- React Context API
- React Toastify
- Tailwind CSS

### Key Components
- **UserForm.jsx**: Add/edit users. Validates required fields, phone length, and uniqueness for email/phone.
- **UserCard.jsx**: User summary cards for dashboard.
- **DashboardPage.jsx**: User list, search, and add/edit modal.
- **UserDetailsPage.jsx**: Detailed user info, edit, and delete (if implemented).
- **UserContext.jsx**: Manages user data and API calls.

### Validation
- Email and phone uniqueness checked on blur and submit.
- Phone must be exactly 10 digits.
- Required fields validated on blur.

---

## Backend

### Technologies
- Node.js (Express)
- SQLite
- dotenv

### API Routes
- `GET /api/users` – List all users
- `GET /api/users/:id` – Get user by ID
- `POST /api/users` – Add user (unique email enforced)
- `PUT /api/users/:id` – Update user
- `DELETE /api/users/:id` – Delete user

### Database Schema
- Users: id, name, username, email (unique), phone, website, address (street, suite, city, zipcode, geo_lat, geo_lng), company (name, catchPhrase, bs)

---

## Deployed URLs
- **Frontend**: https://user-management-dashboard-forty-4.onrender.com/
- **Backend**: https://user-management-dashboard-forty-4-backend.onrender.com/

## Running Locally

### Backend
1. `cd user-management-dashboard/backend`
2. `npm install`
3. `npm start` (default port 3000)

### Frontend
1. `cd user-management-dashboard/frontend`
2. `npm install`
3. `npm run dev`
4. Open http://localhost:5173

---

## Notes
- Frontend uses Context for state and API.
- Email uniqueness validated on frontend and backend.
- Tailwind CSS for styling and responsive design.

---

## Future Improvements
- Pagination
- Authentication/authorization
- Improved error/loading states
- Unit/integration tests

---

## Contact
For questions/issues, contact the maintainer.

