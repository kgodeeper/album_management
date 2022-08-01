const route = require('express').Router();
const { loginRequire } = require('../../utils/midleware.util');
const { uploadAvatar } = require('../../utils/upload.util');
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

route.patch(
	'/forgot-password',
	validation.validationChangePass,
	async (req, res, next) => {
		try {
			await userControl.changePasswordByToken(req, res);
		} catch (error) {
			next(error);
		}
	}
);

route.patch(
	'/change-password',
	loginRequire,
	validation.validationChangePass,
	async (req, res, next) => {
		try {
			await userControl.changePasswordByToken(req, res);
		} catch (error) {
			next(error);
		}
	}
);

route.post('/verify-email', async (req, res, next) => {
	try {
		await userControl.verifyEmail(req, res);
	} catch (error) {
		next(error);
	}
});

route.patch('/update-user', loginRequire, async (req, res, next) => {
	try {
		await userControl.updateUser(req, res);
	} catch (error) {
		next(error);
	}
});

module.exports = { userRoute: route };

