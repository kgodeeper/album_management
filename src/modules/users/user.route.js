const route = require('express').Router();
const userControl = require('./user.controller');
const validation = require('./user.validation');

route.patch(
	'/active-user',
	validation.validateActiveCode,
	async (req, res, next) => {
		try {
			await userControl.activeUser(req, res);
		} catch (error) {
			next(error);
		}
	}
);

route.patch('/resend-code', async (req, res, next) => {
	try {
		await userControl.resendCode(req, res);
	} catch (error) {
		next(error);
	}
});

route.patch('/forgot-password', async (req, res, next) => {
	try {
		await userControl.changePasswordByToken(req, res);
	} catch (error) {
		next(error);
	}
});

route.post('/verify-email', async (req, res, next) => {
	try {
		await userControl.verifyEmail(req, res);
	} catch (error) {
		next(error);
	}
});

module.exports = { userRoute: route };

