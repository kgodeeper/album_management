const route = require('express').Router();
const authControl = require('./auth.controller.js');
const { validateLogin, validateRegis } = require('./auth.validation');

route.post('/login', validateLogin, authControl.userLogin);

route.post('/register', validateRegis, authControl.userRegister);

module.exports = {
	authRoute: route,
};

