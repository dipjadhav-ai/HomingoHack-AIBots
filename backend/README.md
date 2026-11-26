# YojanaSaathi Backend

## Run locally

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

The API listens on `http://localhost:3000` by default. Set `FRONTEND_ORIGIN` in `.env` to the origin serving the frontend.

## API

- `GET /api/health` returns the service status.
- `POST /api/questions` accepts `{ "question": "..." }`. Question answering is not configured yet and returns `501`.
- `POST /api/documents` is reserved for PDF upload. Upload handling and storage are not configured yet and returns `501`.

No authentication, document storage, or AI provider is configured in this starter backend.