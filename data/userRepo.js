const User = require('./schema/user');
const jsonModel = require('../models/response/JsonModel');
const authentication = require('../authentication/authentication');

module.exports = class userRepo {

    static createUser(usernameParam, emailParam, passwordParam, dateofbirthParam, res) {
        User.findOne({username : usernameParam})
            .then((user) => {
                if (user === null) {
                    const newUser = new User({
                        username: usernameParam,
                        email: emailParam,
                        password: passwordParam,
                        dateofbirth: dateofbirthParam
                    });
                    newUser.save()
                        .then((user) => {
                            let token = authentication.encodeToken(usernameParam);
                            res.status(201).json({
                                response: new jsonModel("/api/register", "POST", 201, "User " + user.username + " has been created"),
                                token: token
                            });
                        })
                        .catch(() => {
                            res.status(500).json(new jsonModel("/api/register", "POST", 500, "Something went wrong. User " + usernameParam + " has not been created"));
                        })
                } else {
                    res.status(409).json(new jsonModel("/api/register", "POST", 409, "User " + user.username + " already exists"));
                }
            })
            .catch(() => {
                res.status(500).json(new jsonModel("/api/register", "POST", 500, "Something went wrong. Please try again"));
            })
    }


};