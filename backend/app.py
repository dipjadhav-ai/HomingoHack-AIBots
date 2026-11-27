import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request


load_dotenv()


def create_app():
    app = Flask(__name__)
    app.config["MAX_CONTENT_LENGTH"] = 1024 * 1024

    allowed_origins = [
        origin.strip()
        for origin in os.environ.get("FRONTEND_ORIGIN", "http://localhost:5500").split(",")
        if origin.strip()
    ]

    @app.after_request
    def add_cors_headers(response):
        origin = request.headers.get("Origin")
        if origin in allowed_origins and request.path.startswith("/api/"):
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type"
            response.headers.add("Vary", "Origin")
        return response

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok", "service": "yojanasaathi-api"})

    @app.post("/api/questions")
    def create_question():
        body = request.get_json(silent=True)
        question = body.get("question") if isinstance(body, dict) else None

        if not isinstance(question, str) or not question.strip():
            return jsonify({"error": "A non-empty question is required"}), 400

        return jsonify({"error": "Question answering is not configured yet"}), 501

    @app.post("/api/documents")
    def upload_document():
        return jsonify({"error": "Document upload is not configured yet"}), 501

    @app.errorhandler(404)
    def route_not_found(_error):
        return jsonify({"error": "Route not found"}), 404

    @app.errorhandler(413)
    def request_too_large(_error):
        return jsonify({"error": "Request body exceeds the 1 MB limit"}), 413

    @app.errorhandler(500)
    def internal_server_error(_error):
        return jsonify({"error": "Internal server error"}), 500

    return app


app = create_app()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "3000"))
    debug = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="127.0.0.1", port=port, debug=debug)