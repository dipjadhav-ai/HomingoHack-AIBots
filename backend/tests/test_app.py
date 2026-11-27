import os
import unittest
from unittest.mock import patch

from app import create_app


class ApiTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.environment = patch.dict(
            os.environ,
            {"FRONTEND_ORIGIN": "http://localhost:5500,http://localhost:5501"},
        )
        cls.environment.start()
        cls.app = create_app()
        cls.app.testing = True
        cls.client = cls.app.test_client()

    @classmethod
    def tearDownClass(cls):
        cls.environment.stop()

    def test_health(self):
        response = self.client.get("/api/health")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(),
            {"status": "ok", "service": "yojanasaathi-api"},
        )

    def test_question_requires_non_empty_string(self):
        for body in ({}, {"question": "  "}, {"question": 42}):
            with self.subTest(body=body):
                response = self.client.post("/api/questions", json=body)
                self.assertEqual(response.status_code, 400)
                self.assertEqual(
                    response.get_json(),
                    {"error": "A non-empty question is required"},
                )

    def test_valid_question_is_unconfigured(self):
        response = self.client.post(
            "/api/questions", json={"question": "How do I apply?"}
        )

        self.assertEqual(response.status_code, 501)
        self.assertEqual(
            response.get_json(),
            {"error": "Question answering is not configured yet"},
        )

    def test_document_upload_is_unconfigured(self):
        response = self.client.post("/api/documents")

        self.assertEqual(response.status_code, 501)
        self.assertEqual(
            response.get_json(),
            {"error": "Document upload is not configured yet"},
        )

    def test_unknown_route_returns_json_404(self):
        response = self.client.get("/unknown")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "Route not found"})

    def test_cors_allows_configured_origin(self):
        response = self.client.options(
            "/api/health",
            headers={
                "Origin": "http://localhost:5500",
                "Access-Control-Request-Method": "GET",
            },
        )

        self.assertEqual(
            response.headers.get("Access-Control-Allow-Origin"),
            "http://localhost:5500",
        )

    def test_cors_rejects_unconfigured_origin(self):
        response = self.client.get(
            "/api/health", headers={"Origin": "http://localhost:9999"}
        )

        self.assertIsNone(response.headers.get("Access-Control-Allow-Origin"))


if __name__ == "__main__":
    unittest.main()