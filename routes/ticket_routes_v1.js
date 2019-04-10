const express = require('express');
const router = express.Router();
const ticketRepo = require('../data/repository/ticketRepo');

router.get('/', (req, res) => {
    ticketRepo.getAllTickets(res);
});

router.get('/:ticketId', (req, res) => {
    let ticketId = req.params.ticketId;
    ticketRepo.getTicketById(ticketId, res);
});

router.post('/:concertId/:userId', (req, res) => {
    const concertId = req.params.concertId;
    const userId = req.params.userId;

    ticketRepo.createTicket(concertId, userId, res);
});

router.put('/:ticketId', (req, res) => {
    const ticketId = req.params.ticketId;
    const ticketInfo = req.body;

    ticketRepo.updateTicketByID(ticketId, ticketInfo, res);
});

router.delete('/:ticketId', (req, res) => {
    const ticketId = req.params.ticketId;

    ticketRepo.deleteTicketByID(ticketId, res);
});

module.exports = router;