const Ticket = require('../schema/ticket');
const Concert = require('../schema/concert');
const User = require('../schema/user');
const jsonModel = require('../../models/response/JsonModel');

module.exports = class ticketRepo {

    static getAllTickets(res) {
        const url = "/api/tickets";
        const httpMethod = "GET";

        let ticketArray = [];

        Ticket.find()
            .then((tickets) => {
                for (let ticket of tickets) {
                    ticketArray.push({
                        id: ticket._id,
                        concert: ticket.concert,
                        user: ticket.user,
                        ticketCode: ticket.ticketCode
                    });
                }
                res.status(200).json(ticketArray)
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "No tickets found"));
            })
    }

    static getTicketById(ticketId, res) {
        const url = "/api/tickets/:ticketId";
        const httpMethod = "GET";

        Ticket.findOne({_id: ticketId})
            .then((ticket) => {
                res.status(200).json(ticket);
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "Ticket not found"));
            })
    }

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
            User.findOne({username: userId})
                .then((user) => {
                   newUser = user.username
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

    static updateTicketByID(ticketId, ticket, res) {
        const url = "/api/tickets";
        const httpMethod = "PUT";

        Ticket.findByIdAndUpdate(ticketId, {
            concert: ticket.concert,
            user: ticket.user,
            ticketCode: ticket.userCode
        })
            .then((ticket) => {
                res.status(200).json(new jsonModel(url, httpMethod, 200, "Ticket " + ticketID + " has been successfully updated"));
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "Ticket " + ticketID + " has not been found"));
            })
    }

    static deleteTicketByID(ticketID, res) {
        const url = "/api/tickets/:ticketId";
        const httpMethod = "DELETE";

        Ticket.findByIdAndDelete(ticketID)
            .then(() => {
                res.status(200).json(new jsonModel(url, httpMethod, 200, "Ticket " + ticketID + " has been successfully deleted"));
            })
            .catch(() => {
                res.status(404).json(new jsonModel(url, httpMethod, 404, "Ticket " + ticketID + " has not been found"));
            })
    }
};