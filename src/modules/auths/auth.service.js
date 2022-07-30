require('dotenv').config({ path: './src/configs/.env' });
const userService = require('../users/user.service');
const { sendVerifyMail } = require('../../utils/mail/mail.util');
const { sign } = require('../../utils/jwt/jwt.util');
const crypto = require('crypto');

const userLogin = async (account, password) => {
	const loginStatus = {
		isLogin: true,
		isExist: true,
		accessToken: null,
	};
	try {
		password = crypto.createHash('SHA256').update(password).digest('hex');
		const userExist = await userService.checkUserExist(account, password);
		if (userExist.isExist) {
			if (userExist.isActive) {
				const accessToken = sign({ account }, process.env.SECRETSTR, {
					expiresIn: '1d',
				});
				loginStatus.accessToken = accessToken;
			} else {
				loginStatus.isLogin = false;
			}
		} else {
			loginStatus.isLogin = false;
			loginStatus.isExist = false;
		}
	} catch (error) {
		throw error;
	}
	return loginStatus;
};

const userRegister = async (username, password, email) => {
	try {
		password = crypto.createHash('SHA256').update(password).digest('hex');
		const date = new Date();
		date.setMinutes(date.getMinutes() + 2);
		const activationCode = Number(date);
		const regisStatus = await userService.userRegister(
			username,
			password,
			email,
			activationCode
		);
		let register = { ...regisStatus, username, email };
		if (register.isRegister) {
			sendVerifyMail(email, activationCode);
		}
		return register;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	userLogin,
	userRegister,
};

