function uploadDocument(req, res) {
    res.status(501).json({ error: 'Document upload is not configured yet' });
}

module.exports = { uploadDocument };