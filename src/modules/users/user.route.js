const route = require('express').Router();
const userControl = require('./user.controller');
const validation = require('./user.validation');

route.put(
	'/verify-email',
	validation.validateActiveCode,
	async (req, res, next) => {
		try {
			await userControl.verifyEmail(req, res);
		} catch (error) {
			next(error);
		}
	}
);

route.put('/resend-code', async (req, res, next) => {
	try {
		await userControl.resendCode(req, res);
	} catch (error) {
		next(error);
	}
});

route.get('/');

module.exports = { userRoute: route };

