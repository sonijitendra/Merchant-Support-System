# Support Ticket System

A production-minded MERN support queue for merchants to create, track, filter, and resolve tickets through a strict workflow.

## Highlights

- Create tickets with subject, message, and priority
- Filter by status and priority
- Sort by latest or priority
- Paginate ticket results
- View dashboard stats for total, open, and resolved tickets
- Update ticket status only through the allowed workflow
- Show loading, empty, error, and success states

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite
- Styling: Tailwind CSS
- HTTP client: Axios

## Architecture

The project uses a simple monorepo layout with a clean separation between backend and frontend code.

```text
project-root/
|- backend/
|  |- src/
|  |  |- config/
|  |  |- controllers/
|  |  |- middlewares/
|  |  |- models/
|  |  |- routes/
|  |  |- seed/
|  |  |- services/
|  |  |- utils/
|- frontend/
|  |- src/
|  |  |- api/
|  |  |- components/
|  |  |- constants/
|- scripts/
|- Support Ticket System.postman_collection.json
```

## Backend Design

- Thin controllers with service-layer business logic
- Request validation through dedicated middleware
- Centralized error handling with a consistent JSON response
- Request logging middleware for API visibility
- MongoDB + Mongoose for persistence
- Pagination, filters, and sorting on the list endpoint

## Frontend Design

- React + Vite for a fast, lightweight UI
- Tailwind CSS with a clean custom design layer
- Shared Axios instance for all API calls
- Reusable components for stats, filters, form, table, pagination, and feedback
- Single dashboard page to keep the experience focused

## Environment Variables

### Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend `.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Local Setup

### 1. Install dependencies

From the project root:

```powershell
cd backend
cmd /c npm install

cd ..\frontend
cmd /c npm install
```

### 2. Configure environment files

- Copy `backend/.env.example` to `backend/.env`
- Copy `frontend/.env.example` to `frontend/.env`
- Add your MongoDB Atlas connection string to `backend/.env`

### 3. Seed demo data

```powershell
cd backend
cmd /c npm run seed
```

### 4. Run the apps

From the project root:

```powershell
npm run dev
```

If PowerShell blocks npm, use `cmd /c npm run dev`.

## API Endpoints

### `POST /api/tickets`

Creates a new ticket.

Example body:

```json
{
  "subject": "Payment settlement delay",
  "message": "Merchant payout has not landed in the expected window and reconciliation is blocked.",
  "priority": "High"
}
```

### `GET /api/tickets`

Returns paginated tickets plus dashboard summary.

Supported query params:

- `page`
- `limit`
- `status`
- `priority`
- `sort=latest|priority`

Example:

```text
/api/tickets?page=1&limit=6&status=NEW&priority=High&sort=priority
```

### `PATCH /api/tickets/:id`

Updates ticket status.

Example body:

```json
{
  "status": "INVESTIGATING"
}
```

Allowed transitions:

- `NEW -> INVESTIGATING`
- `INVESTIGATING -> RESOLVED`

## Error Response Format

```json
{
  "message": "Validation failed.",
  "errors": {
    "subject": "Subject is required."
  }
}
```

## Deployment

### Render backend

- Deploy the `backend/` folder as a Render Web Service
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `PORT`
  - `MONGODB_URI`
  - `CLIENT_URL`
  - `NODE_ENV=production`

After the frontend is deployed, update `CLIENT_URL` with the Vercel domain.

### Vercel frontend

- Deploy the `frontend/` folder as a Vercel project
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable:
  - `VITE_API_BASE_URL=https://your-render-service.onrender.com/api`

## Manual QA Checklist

- Create a ticket with valid data
- Validate required field errors
- Filter the list by status and priority
- Sort by latest and priority
- Navigate between pages
- Move a ticket from `NEW` to `INVESTIGATING`
- Move a ticket from `INVESTIGATING` to `RESOLVED`
- Confirm a `RESOLVED` ticket no longer offers a next action
- Confirm analytics update after mutations
- Confirm the filtered empty state and initial empty state both render correctly

## API Review Examples

### Create a ticket

```bash
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -d "{\"subject\":\"Refund mismatch\",\"message\":\"Merchant refund status is out of sync with the dashboard and needs investigation.\",\"priority\":\"High\"}"
```

### List filtered tickets

```bash
curl "http://localhost:5000/api/tickets?page=1&limit=6&status=NEW&sort=priority"
```

### Update ticket status

```bash
curl -X PATCH http://localhost:5000/api/tickets/TICKET_ID \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"INVESTIGATING\"}"
```

## Live Demo

- Frontend: `https://merchant-support-system.vercel.app`
- Backend: `https://merchant-support-system.onrender.com/`
