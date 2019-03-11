const express = require('express');
const router = express.Router();
const artistRepo = require('../data/repository/artistRepo');

// Get all artists from db
router.get('/', (req, res) => {
    artistRepo.getAllArtists(res);
});


// Get single artist from db
router.get('/:artistId', (req, res) => {
    let artistId = req.params.artistId;
    artistRepo.getArtistById(artistId, res);
});

// Add a new artist to the artist DB
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

// Update an existing artist in the db
router.put('/:artistId', (req, res) => {
    let artistInfo = req.body;

    artistRepo.updateArtist();
});

module.exports = router;