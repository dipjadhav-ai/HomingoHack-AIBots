const cors = require('cors');
const express = require('express');
const apiRoutes = require('./routes');

const app = express();
const allowedOrigins = (process.env.FRONTEND_ORIGIN || 'http://localhost:5500')
    .split(',')
    .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '1mb' }));
app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;