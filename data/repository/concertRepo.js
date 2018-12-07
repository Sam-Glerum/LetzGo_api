const Concert = require('../schema/concert');
const jsonModel = require('../../models/response/JsonModel');
const apiErrors = require('../../models/error/apiErrors');

module.exports = class concertRepo {

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
                    res.status(409).json(new jsonModel(url, httpMethod, 409, "Concert already exists."))
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
};