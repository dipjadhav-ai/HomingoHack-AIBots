# YojanaSaathi Backend

This backend uses Flask and Python. The frontend remains a separate static app and is not connected to these endpoints yet.

## Run locally

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
python app.py
```

The API listens at `http://localhost:3000` by default. Edit `.env` to set `PORT`, `FRONTEND_ORIGIN`, or `FLASK_DEBUG`; multiple allowed origins can be comma-separated. Shell environment variables take precedence over values in `.env`.

Run the API tests with:

```powershell
python -m unittest discover -s tests
```

## API

- `GET /api/health` returns `{ "status": "ok", "service": "yojanasaathi-api" }`.
- `POST /api/questions` expects JSON with a non-empty `question` string. Invalid input returns `400`; valid input returns `501` because question answering is not configured.
- `POST /api/documents` returns `501` because document upload and storage are not configured.
- Unknown routes return a JSON `404` response.

The request body limit is 1 MB. This starter does not include AI answering, PDF parsing or storage, authentication, or a database. The frontend still uses its existing demo behavior until it is separately wired to this API.