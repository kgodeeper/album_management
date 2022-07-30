const route = require('express').Router();
const authControl = require('./auth.controller.js');
const validation = require('./auth.validation');

route.post('/login', validation.validateLogin, async (req, res, next) => {
	try {
		return await authControl.userLogin(req, res);
	} catch (error) {
		next(error);
	}
});

route.post('/register', validation.validateRegis, async (req, res, next) => {
	try {
		return await authControl.userRegister(req, res);
	} catch (error) {
		next(error);
	}
});

module.exports = {
	authRoute: route,
};

