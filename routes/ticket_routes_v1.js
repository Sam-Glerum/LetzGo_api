const express = require('express');
const router = express.Router();
const ticketRepo = require('../data/repository/ticketRepo');

router.get('/', (req, res) => {
    res.json("tickets")
});

router.post('/:concertId/:userId', (req, res) => {
    const concertId = req.params.concertId;
    const userId = req.params.userId;

    ticketRepo.createTicket(concertId, userId, res);
});

module.exports = router;