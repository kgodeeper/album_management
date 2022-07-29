const route = require('express').Router();
const authControl = require('./auth.controller.js');

route.post('/login', async (req, res, next) => {
	try {
		return await authControl.userLogin(req, res);
	} catch (error) {
		next(error);
	}
});

module.exports = {
	auth: route,
};

