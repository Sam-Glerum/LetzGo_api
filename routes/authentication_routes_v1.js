const express = require('express');
const router = express.Router();
const authentication = require('../authentication/authentication');
const checkObjects = require('../models/CheckObjects');
const apiErrors = require('../models/error/apiErrors');
const userRepo = require('../data/userRepo');

router.all(new RegExp("^(?!\/login$|\/register$).*"), (req, res, next) => {
    // Get token from headers
    const token = req.header('X-Access-Token');

    authentication.decodeToken(token, (error, payload) => {
        if (error) {
            console.log('Error: ' + error.message);

            res.status((error.status || 401)).json("Not Authorised");
        } else {
            req.user = {
                username: payload.sub
            };
            next();
        }
    })
});

// Register route
router.post('/register', (req, res) => {
    const registerInfo = req.body;
    if (!checkObjects.isValidRegistration(registerInfo)) {
        res.status(error.status).json(apiErrors.wrongRequestBodyProperties);
        return;
    }

    const username = registerInfo.username.trim().toLowerCase();
    const email = registerInfo.email.trim().toLowerCase();
    const password = registerInfo.password.trim();
    const dateofbirth = registerInfo.dateofbirth;

    userRepo.createUser(username, email, password, dateofbirth, res);
});

// Login route
router.post('/login', (req, res) => {
    const loginInfo = req.body;
    if (!checkObjects.isValidLogin(loginInfo)) {
        res.status(error.status).json(apiErrors.wrongRequestBodyProperties);
        return;
    }

    const username = loginInfo.username;
    const password = loginInfo.password;

    userRepo.login(username, password, res);
});

// Change Password route
router.post('/user/changepassword', (req, res) => {
    const changePasswordInfo = request.body;

    if (!checkObjects.isValidPasswordChange(changePasswordInfo)) {
        const error = apiErrors.wrongRequestBodyProperties;
        res.status(error.status).json(error);
        return;
    }

    const password = changePasswordInfo.password;
    const newPassword = changePasswordInfo.newPassword;

    userRepo.changePassword(req.user.username, password, newPassword, res);
});

// Delete user route
router.delete('/user', (req, res) => {
    userRepo.deleteUser(req.user.username, res);
});


module.exports = router;