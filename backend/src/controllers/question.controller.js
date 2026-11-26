function createQuestion(req, res) {
    const { question } = req.body || {};

    if (typeof question !== 'string' || question.trim().length === 0) {
        return res.status(400).json({ error: 'A non-empty question is required' });
    }

    return res.status(501).json({ error: 'Question answering is not configured yet' });
}

module.exports = { createQuestion };