require('dotenv').config({ path: './src/configs/.env' });
const userService = require('../users/user.service');
const { Error } = require('../../errors/error-handling');
const { sendVerifyMail, generateCode } = require('../../utils/mail.util');
const { sign } = require('../../utils/jwt.util');
const crypto = require('crypto');

const userLogin = async (account, password) => {
	password = crypto.createHash('SHA256').update(password).digest('hex');
	const userExist = await userService.checkUserExist(account, password);
	if (userExist.isExist) {
		if (userExist.isActive) {
			accessToken =
				sign({ account }, process.env.SECRETSTR, {
					expiresIn: '1d',
				}) || null;
			return accessToken;
		} else {
			throw new Error(500, "user isn't active");
		}
	} else {
		throw new Error(500, "user isn't exist");
	}
};

const userRegister = async info => {
	info.password = crypto
		.createHash('SHA256')
		.update(info.password)
		.digest('hex');
	activationCode = generateCode();
	info.activationCode = activationCode;
	try {
		await userService.userRegister(info);
		sendVerifyMail(info.email, activationCode);
		return true;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	userLogin,
	userRegister,
};

