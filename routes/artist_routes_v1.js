const express = require('express');
const router = express.Router();
const artistRepo = require('../data/repository/artistRepo');

router.get('/', (req, res) => {
    res.json("artist");
});

router.post('/', (req, res) => {
    let artistInfo = req.body;

    artistRepo.createArtist(
        artistInfo.name,
        artistInfo.picture,
        artistInfo.genre,
        artistInfo.description,
        artistInfo.discography,
        res
    );



});

module.exports = router;