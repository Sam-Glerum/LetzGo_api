const express = require('express');
const router = express.Router();
const concertRepo = require('../data/repository/concertRepo');

router.get('/', (req, res) => {
    concertRepo.getAllConcerts(res);
});

router.get('/:concertId', (req, res) => {
    const concertId = req.params.concertId;
    concertRepo.getConcertById(concertId, res);
    // res.json("get specific concert");
});

router.post('/', (req, res) => {
    const concertInfo = req.body;
    concertRepo.createConcert(
        concertInfo.name,
        concertInfo.date,
        concertInfo.city,
        concertInfo.street,
        concertInfo.houseNumber,
        concertInfo.zipCode,
        concertInfo.price,
        concertInfo.description,
        [],
        res
    )
});

router.put('/:concertId', (req, res) => {
    const concertId = req.params.concertId;
    const concertInfo = req.body;

    concertRepo.updateConcertByID(
        concertId,
        concertInfo.name,
        concertInfo.date,
        concertInfo.city,
        concertInfo.street,
        concertInfo.houseNumber,
        concertInfo.zipCode,
        concertInfo.price,
        concertInfo.description,
        concertInfo.artists,
        res
    )
});

router.delete('/:concertId', (req, res) => {
    const concertId = req.params.concertId;

    concertRepo.deleteConcertByID(concertId, res);
});

module.exports = router;