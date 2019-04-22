const Concert = require('../schema/concert');
const jsonModel = require('../../models/response/JsonModel');
const apiErrors = require('../../models/error/apiErrors');

module.exports = class concertRepo {

    static getAllConcerts(res) {
        const url = "/api/concerts";
        const httpMethod = "GET";

        let concertArray = [];

        Concert.find()
            .then((concerts) => {
                for (let concert of concerts) {
                    concertArray.push({
                        "_id": concert.id,
                        "name": concert.name,
                        "date": concert.date.toLocaleString(),
                        "city": concert.city,
                        "street": concert.street,
                        "houseNumber": concert.houseNumber,
                        "zipCode": concert.zipCode,
                        "price": concert.price,
                        "description": concert.description,
                        "artists": concert.artists
                    });
                }
                res.status(200).json(concertArray);
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "No concerts found"));
            })
    }

    static getConcertById(concertID, res) {
        const url = "/api/concerts/:concertId";
        const httpMethod = "GET";

        Concert.findOne({_id: concertID})
            .then((concert) => {
                res.status(200).json(concert);
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "No concert found"));
            })
    }

    static getConcertByName(concertNameParam, res) {
        const url = "/api/concerts";
        const httpMethod = "GET";

        Concert.findOne({name: nameParam})
            .then((concert) => {
                res.status(200).json({"concert": concert})
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "Concert " + concertNameParam + " not found"))
            })
    }

    static createConcert(nameParam, dateParam, cityParam, streetParam, houseNumberParam,
                         zipCodeParam, priceParam, descriptionParam, artistParam, res) {
        const url = "/api/concerts";
        const httpMethod = "POST";

        Concert.findOne({name: nameParam})
            .then((concert) => {
                if (concert === null ) {
                    const newConcert = new Concert({
                        name: nameParam,
                        date: dateParam,
                        city: cityParam,
                        street: streetParam,
                        houseNumber: houseNumberParam,
                        zipCode: zipCodeParam,
                        price: priceParam,
                        description: descriptionParam,
                        artists: artistParam
                    });

                    newConcert.save()
                        .then((concert) => {
                            res.status(201).json(new jsonModel(
                                url,
                                httpMethod,
                                201,
                                "Concert " + concert.name + " has been created"));
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel(
                                url,
                                httpMethod,
                                500,
                                "Something went wrong. Concert " + nameParam + " has not been created."));
                        })
                } else {
                    res.status(409).json(new jsonModel(
                        url,
                        httpMethod,
                        409,
                        "Concert already exists."));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel(
                    url,
                    httpMethod,
                    500,
                    "Something went wrong, please try again."
                ))
            })
    }

    static updateConcertByID(concertID, nameParam, dateParam, cityParam, streetParam, houseNumberParam,
                             zipCodeParam, priceParam, descriptionParam, artistParam, res) {
        const url = "/api/concerts";
        const httpMethod = "PUT";

        Concert.findOneAndUpdate(concertID, {
            name: nameParam,
            date: dateParam,
            city: cityParam,
            street: streetParam,
            houseNumber: houseNumberParam,
            zipCode: zipCodeParam,
            price: priceParam,
            description: descriptionParam,
            artists: artistParam
        })
            .then((concert) => {
                res.status(200).json(new jsonModel(url, httpMethod, 200, "Concert " + concertID + " has been successfully updated"));
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "Concert " + concertID + " has not been found"));
            })
    }

    static deleteConcertByID(concertID, res) {
        const url = "/api/concerts";
        const httpMethod = "DELETE";

        Concert.findByIdAndDelete(concertID)
            .then((concert) => {
                res.status(200).json(new jsonModel(url, httpMethod, 200, "Concert " + concertID + " has been successfully deleted"));
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "Concert " + concertID + " does not exist"));
            })
    };
};