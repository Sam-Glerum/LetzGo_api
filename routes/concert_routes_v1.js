const express = require('express');
const router = express.Router();
const concertRepo = require('../data/repository/concertRepo');

router.get('/', (req, res) => {
    res.json("concerts");
});

router.post('/', (req, res) => {
    const concertInfo = req.body;
    concertRepo.createConcert(
        concertInfo.name,
        concertInfo.dateParam,
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

module.exports = router;