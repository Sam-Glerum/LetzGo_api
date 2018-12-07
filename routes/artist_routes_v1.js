const express = require('express');
const router = express.Router();
const artistRepo = require('../data/repository/artistRepo');

router.get('/', (req, res) => {
    artistRepo.getAllArtists(res);
});

router.get('/:artistId', (req, res) => {
    let artistId = req.params.artistId;
    artistRepo.getArtistById(artistId, res);
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