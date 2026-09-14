# Personal Portfolio - Assignment 3

This project extends the Assignment 2 React portfolio with an Express API while retaining its routing, responsive layout, and theme toggle.

## Setup

Install and run the frontend from the repository root:

```bash
npm install
npm run dev
```

In a second terminal, configure and run the backend:

```bash
cd server
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend runs at `http://localhost:5000` by default. Use `npm start` in `server` to run without watch mode.

## Environment variables


Create a .env file with the following details. Example: 
```
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
CONTACTS_FILE=./data/contacts.json
```

## API

| Method | Endpoint | Response |
| --- | --- | --- |
| GET | `/` | `200 { "status": "ok" }` |
| GET | `/api/projects` | `200` array of project objects |
| GET | `/api/projects/:id` | matching project or `404 { "error": "Project not found" }` |
| POST | `/api/contact` | `201` confirmation and saved submission |
| GET | `/api/contact` | `200` array of saved submissions |

`POST /api/contact` accepts JSON with `name`, `email`, and `message`. All fields are required and email must be valid; invalid data returns `400` with an error message. Submissions persist in the JSON file configured by `CONTACTS_FILE`.

`GET /api/contact` is deliberately open without authentication for assignment verification only and must not be made public in a production portfolio. Unknown routes, malformed JSON, and other server errors return JSON errors rather than raw HTML or stack traces.

## Request coverage

Import `server/Portfolio API.postman_collection.json` into Postman, or run these after starting the server:

```bash
curl http://localhost:5000/
curl http://localhost:5000/api/projects
curl http://localhost:5000/api/projects/buckshot-roulette
curl http://localhost:5000/api/projects/unknown
curl http://localhost:5000/api/contact
curl -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Hello\"}"
curl -X POST http://localhost:5000/api/contact -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"email\":\"invalid\",\"message\":\"Hello\"}"
```
## AI Assistance Disclosure
Generative AI was used to learn new backend concepts. No AI coding assistants were used and AI generated code has not been submitted.