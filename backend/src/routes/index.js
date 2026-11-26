const express = require('express');
const healthController = require('../controllers/health.controller');
const questionController = require('../controllers/question.controller');
const documentController = require('../controllers/document.controller');

const router = express.Router();

router.get('/health', healthController.getHealth);
router.post('/questions', questionController.createQuestion);
router.post('/documents', documentController.uploadDocument);

module.exports = router;