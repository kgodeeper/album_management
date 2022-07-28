const route = require('express').Router();
const authControl = require('./auth.controller.js');

route.post('/login', (req, res) => {
	return authControl.userLogin(req, res);
});

module.exports = {
	auth: route,
};

