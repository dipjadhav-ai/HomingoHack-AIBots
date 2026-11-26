function getHealth(req, res) {
    res.json({ status: 'ok', service: 'yojanasaathi-api' });
}

module.exports = { getHealth };