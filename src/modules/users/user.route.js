const route = require('express').Router();
const { loginRequire } = require('../../utils/midleware.util');
const { uploadAvatar } = require('../../utils/upload.util');
const userControl = require('./user.controller');
const validation = require('./user.validation');

route.patch(
	'/active-user',
	validation.validateActiveCode,
	userControl.activeUser
);

route.patch('/resend-code', userControl.resendCode);

route.patch(
	'/forgot-password',
	validation.validationChangePass,
	userControl.changePasswordByToken
);

route.patch(
	'/change-password',
	loginRequire,
	validation.validationChangePass,
	userControl.changePasswordByToken
);

route.post('/verify-email', userControl.verifyEmail);

route.patch('/users', loginRequire, userControl.updateUser);

module.exports = { userRoute: route };

