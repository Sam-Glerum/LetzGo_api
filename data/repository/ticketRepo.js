const Ticket = require('../schema/ticket');
const Concert = require('../schema/concert');
const User = require('../schema/user');
const jsonModel = require('../../models/response/JsonModel');

module.exports = class ticketRepo {

    static createTicket(concertId, userId, res) {
        const url = "/api/tickets";
        const httpMethod = "POST";

        let ticketNumberParam = "";

        for (let i = 0; i < 5; i++) {
            ticketNumberParam += Math.floor(Math.random() * 10);
        }
        console.log(ticketNumberParam);

        let newConcert = "";
            Concert.findOne({_id: concertId})
                .then((concert) => {
                    newConcert = concert._id
                })
                .catch(() => {
                    res.status(404).json(new jsonModel(url, httpMethod, 404, "Concert not found"));
                });

            console.log("Concert: " + newConcert);

        let newUser = "";
            User.findOne({_id: userId})
                .then((user) => {
                   newUser = user._id
                })
                .catch(() => {
                    res.status(404).json(new jsonModel(url, httpMethod, 404, "User not found"));
                });

            console.log("User: " + newUser);

        Ticket.findOne({ticketCode: ticketNumberParam})
            .then((ticket) => {
                if (ticket === null) {
                    const newTicket = new Ticket({
                        concert: newConcert,
                        user: newUser,
                        ticketCode: ticketNumberParam
                    });
                    newTicket.save()
                        .then((ticket) => {
                            res.status(201).json(new jsonModel(url, httpMethod, 201, "Ticket has been created"));
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel(url, httpMethod, 500, "Something went wrong."));
                        })
                } else {
                    res.status(409).json(new jsonModel(url, httpMethod, 409, "Ticket already exists."));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel(url, httpMethod, 500, "Something went wrong. Please try again"));
            })
    }
};