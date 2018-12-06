const Artist = require('../schema/artist');
const jsonModel = require('../../models/response/JsonModel');
const authentication = require('../../authentication/authentication');
const apiErrors = require('../../models/error/apiErrors');

module.exports = class artistRepo {

    static createArtist(artistName, imagePath, genreParam, descriptionContent, discographyParam, res) {
        let url = "/api/artist";
        let httpMethod = "POST";
        Artist.findOne({name: artistName})
            .then((artist) => {
                if (artist === null) {
                    const newArtist = new Artist({
                        name: artistName,
                        picure: imagePath,
                        genre: genreParam,
                        description: descriptionContent,
                        discography: discographyParam
                    });
                    newArtist.save()
                        .then((artist) => {
                            res.status(201).json(new jsonModel(url, httpMethod, 201, "Artist " + artist.name + " has been created"));
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel(url, httpMethod, 500, "Something went wrong. Artist " + artistName + " Has not been created" ));
                        })
                } else {
                    res.status(409).json(new jsonModel(url, httpMethod, 409, "Artist " + artist.name + " already exists"));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel(url, httpMethod, 500, "Something went wrong. Please try again"))
            })
    }

};