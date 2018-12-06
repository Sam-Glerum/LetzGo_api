const User = require('../schema/user');
const jsonModel = require('../../models/response/JsonModel');
const authentication = require('../../authentication/authentication');
const apiErrors = require('../../models/error/apiErrors');

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

    static login(usernameParam, passwordParam, res) {
        User.findOne({username: usernameParam})
            .then((user) => {
                if (user.password === passwordParam) {
                    let token = authentication.encodeToken(usernameParam);
                    res.status(200).json({
                        response: new jsonModel("/api/login", "POST", 200, "You have been logged in"),
                        token: token});
                } else {
                    res.status(401).json(apiErrors.notAuthorised());
                }
            })
            .catch(() => {
                res.status(401).json(apiErrors.notAuthorised());
            })
    }
    //
    // static changePassword(usernameParam, currentPassword, newPassword, response) {
    //     User.findOne({ username: usernameParam })
    //         .then((user) => {
    //             console.log(user);
    //             if(user.password === currentPassword) {
    //                 user.set({ password: newPassword });
    //                 user.save()
    //                     .then(() => {
    //                         response.status(200).json(new jsonModel("/api/users", "PUT", 200, "Your password has been succesfully changed."));
    //                     })
    //                     .catch(() => {
    //                         response.status(500).json(apiErrors.internalServerError());
    //                     })
    //             } else {
    //                 response.status(401).json(apiErrors.notAuthorised());
    //             }
    //         })
    //         .catch(() => {
    //             response.status(422).json(new jsonModel("/api/users", "PUT", 422, "User " + usernameParam + " not found"));
    //         });
    // };
    //
    // static deleteUser(username, password, response) {
    //     User.findOne({username})
    //         .then((user) => {
    //             if (user.password === password) {
    //                 User.findOneAndDelete({username})
    //                     .then(() => {
    //                         response.status(200).json(new jsonModel("/api/users", "DELETE", 200, "The user has been succesfully deleted."))
    //                     })
    //                     .catch(() => {
    //                         response.status(500).json(apiErrors.internalServerError());
    //
    //                     })
    //
    //             } else {
    //                 response.status(401).json(apiErrors.notAuthorised());
    //             }
    //         })
    //         .catch(() => {
    //             response.status(422).json(new jsonModel("/api/users", "DELETE", 422, "The user does not exist"));
    //         });
    // }


};