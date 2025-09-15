# User Management API (Backend)

A lightweight Express + SQLite backend that powers the User Management Dashboard. Provides basic CRUD operations for user records with server-side validation.

## Tech Stack
- Node.js (ES Modules)
- Express 5
- SQLite (via `sqlite` + `sqlite3`)
- Environment config: `dotenv`
- Input validation & sanitization: `validator`
- Dev tooling: `nodemon`

## Project Structure
```
backend/
  server.js           # Express app bootstrap
  database.js         # SQLite initialization + schema creation
  routes/users.js     # Users CRUD endpoints
  middleware/
    validation.js     # Validation & sanitization middleware
  users.db            # SQLite database file (auto-created)
  .env / .env.example # Environment configuration
  package.json
```

## Features (Current)
- Create user (name + email required; email unique)
- Read all users (sorted by newest `id` first)
- Read single user by `id`
- Update user by `id`
- Delete user by `id` (hard delete)
- Field-level validation with clear error messages

## Planned / Potential Enhancements
> (Not yet implemented; candidates for future commits)
- Pagination & search filtering (page, limit, search)
- Timestamps (`created_at`, `updated_at`)
- Soft delete (`deleted_at`)
- Centralized error handler
- Structured logging & request correlation
- Rate limiting & security headers
- OpenAPI (Swagger) docs
- Test suite (Jest + Supertest)

## Environment Variables
Create a `.env` (copy from `.env.example`):

| Variable   | Default    | Description |
| ---------- | ---------- | ----------- |
| PORT       | 3000       | HTTP server port |
| DB_PATH    | users.db   | Relative path to SQLite DB file |
| NODE_ENV   | development| Environment mode (affects logging, future conditionals) |
| BASE_URL   | (none)     | Public base URL of deployed API (e.g. Render URL) |

Example `.env`:
```
PORT=3000
DB_PATH=users.db
NODE_ENV=development
BASE_URL=https://your-backend-service.onrender.com
```

## Installation & Setup
From the `backend` directory:

```bash
npm install
npm start
```

Server will start on `http://localhost:3000` (or the `PORT` you set).

## Deployment (Render)
If you deploy this backend on Render:

1. Create a new Web Service from the repository (Root directory: `backend/` if monorepo setup requires).
2. Set Build Command (if none needed) to:
  - `npm install`
3. Set Start Command:
  - `npm start`
4. Add Environment Variables in the Render dashboard matching your `.env` (at minimum `PORT` and optionally `DB_PATH`). Render normally injects `PORT`, so you can omit or leave it.
5. (Optional) Add `NODE_ENV=production`.

After deployment, note the public URL (e.g. `https://your-backend-service.onrender.com`) and set it locally in `.env` as `BASE_URL` so the frontend (or API clients) can reference it consistently.

Example:
```
BASE_URL=https://your-backend-service.onrender.com
```

You can then consume this in the frontend by configuring a matching environment variable (e.g. `VITE_API_BASE` or similar) pointing to `${BASE_URL}/api`.

## Database
- SQLite file auto-created at first run (`users.db`).
- Table created if it does not exist:
```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  street TEXT,
  city TEXT,
  zipcode TEXT,
  geo_lat TEXT,
  geo_lng TEXT
);
```

## API Overview
Base URL: `http://localhost:3000/api/users`

### List Users
GET `/api/users`
Response:
```json
{
  "data": [ { "id": 2, "name": "Alice", "email": "alice@example.com", ... } ]
}
```

### Get User By ID
GET `/api/users/:id`
```bash
curl http://localhost:3000/api/users/1
```
Response (200):
```json
{ "data": { "id": 1, "name": "John", "email": "john@example.com" } }
```
Not Found (404):
```json
{ "error": "User not found" }
```

### Create User
POST `/api/users`
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "city": "Austin"
  }'
```
Success (201):
```json
{ "message": "User created successfully", "id": 3 }
```
Validation Error (400):
```json
{
  "error": "Validation failed",
  "details": ["Name is required", "Invalid email format"]
}
```
Duplicate Email (400):
```json
{ "error": "A user with this email already exists." }
```

### Update User
PUT `/api/users/:id`
```bash
curl -X PUT http://localhost:3000/api/users/3 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane D.",
    "email": "jane@example.com",
    "city": "Dallas"
  }'
```
Success (200):
```json
{ "message": "User updated successfully", "changes": 1 }
```
Not Found (404):
```json
{ "error": "User not found" }
```

### Delete User
DELETE `/api/users/:id`
```bash
curl -X DELETE http://localhost:3000/api/users/3
```
Success (200):
```json
{ "message": "User deleted successfully", "changes": 1 }
```
Not Found (404):
```json
{ "error": "User not found" }
```

## Validation Rules (Current)
Required:
- name (non-empty)
- email (valid format)

Optional (constraints):
- phone: max 15 chars
- street: max 200 chars
- city: max 100 chars
- zipcode: max 20 chars
- geo_lat: numeric between -90 and 90
- geo_lng: numeric between -180 and 180

Sanitization: Trims all string fields.

## Error Response Shapes (Current)
- Validation errors:
```json
{ "error": "Validation failed", "details": ["..."] }
```
- Not found:
```json
{ "error": "User not found" }
```
- Duplicate email:
```json
{ "error": "A user with this email already exists." }
```
- Internal server errors:
```json
{ "error": "Internal server error" }
```

## Development Notes
- Hot reload via `nodemon` (`npm start`).
- ES Module syntax is enabled via `"type": "module"` in `package.json`.
- API root health check: `GET /` → `"User Management API is running."`

## Suggested Next Improvements
1. Introduce centralized error handler & async wrapper.
2. Add pagination & search to list endpoint.
3. Add Jest + Supertest test suite.
4. Add security hardening (helmet, CORS origin allowlist, rate limiting).
5. Implement soft delete & timestamps.
6. Provide OpenAPI spec.
7. Containerize with Docker.

---
Feel free to modify this README as the backend evolves.
