const Artist = require('../schema/artist');
const jsonModel = require('../../models/response/JsonModel');
const authentication = require('../../authentication/authentication');
const apiErrors = require('../../models/error/apiErrors');

module.exports = class artistRepo {

    static getAllArtists(res) {
        let url = "/api/artists";
        let httpMethod = "GET";

        let artistArray = [];

        Artist.find()
            .then((artists) => {
                for (let artist of artists) {
                    artistArray.push({
                        "_id": artist.id,
                        "name": artist.name,
                        "picture": artist.picture,
                        "genre": artist.genre,
                        "description": artist.description,
                        "discography": artist.discography
                    });
                }
                res.status(200).json({"artists": artistArray});
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "No artists found"));
            })
    }

    static getArtistById(artistId, res) {
        let url = "/api/artists";
        let httpMethod = "GET";

        Artist.findOne({_id: artistId})
            .then((artist) => {
                res.status(200).json(artist);
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "Artist not found"));
            })
    };

    static getArtistByname(artistName, res) {
        let url = "/api/artists";
        let httpMethod = "GET";

        Artist.findOne({name: artistName})
            .then((artist) => {
                res.status(200).json(artist);
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "Artist " + artistName + " not found"));
            })
    };

    static createArtist(artistName, imagePath, genreParam, descriptionContent, discographyParam, res) {
        let url = "/api/artists";
        let httpMethod = "POST";
        Artist.findOne({name: artistName})
            .then((artist) => {
                if (artist === null) {
                    const newArtist = new Artist({
                        name: artistName,
                        picture: imagePath,
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

    // static updateArtist(artistID, artistInfo, res) {
    //     let url = "/api/artists/" + artistID;
    //     let httpMethod = "PUT";

    //     Artist.findOneAndUpdate({_id: artistID}, {
    //         "name": artistInfo.name,
    //         "picture": artistInfo.picture,
    //         "genre": artistInfo.genre,
    //         "description": artistInfo.description,
    //         "discography": artistInfo.discography
    //     }).then(() => {
    //         res.status(200).json(new jsonModel(url, httpMethod, 200, "Artist successfully updated."))
    //     }).catch(() => {
    //         res.status(500).json(new jsonModel(url, httpMethod, 500, "Something went wrong."))
    //     })
    // }
    static updateArtist(artistID, artistInfo, res) {
        let url = "/api/artists/" + artistID;
        let httpMethod = "PUT";

        Artist.findOneAndReplace({artistID}, {
            "name": artistInfo.name,
            "picture": artistInfo.picture,
            "genre": artistInfo.genre,
            "description": artistInfo.description,
            "discography": artistInfo.discography,
            "concerts": artistInfo.concerts
        }).then(() => {
            res.status(200).json(new jsonModel(url, httpMethod, 200, "Artist successfully updated."))
        }).catch(() => {
            res.status(500).json(new jsonModel(url, httpMethod, 500, "Something went wrong."))
        })
    }

    static deleteArtist(artistID, res) {
        let url = "/api/artists/" + artistID;
        let httpMethod = "DELETE";

        Artist.findByIdAndRemove(artistID)
            .then(() => {
                res.status(200).json(new jsonModel(url, httpMethod, 200, "Artist " + artistID + " successfully deleted"));
            })
            .catch(() => {
                res.status(500).json(new jsonModel(url, httpMethod, 500, "Something went wrong"));
            })
    }

};