require('dotenv').config({ path: './src/configs/.env' });
const userService = require('../users/user.service');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userLogin = async (username, password) => {
	const loginStatus = {
		isLogin: true,
		isExist: true,
		accessToken: null,
		error: null,
	};
	try {
		password = crypto.createHash('SHA256').update(password).digest('hex');
	} catch (error) {
		loginStatus.isLogin = loginStatus.isExist = false;
		loginStatus.error = `password not valid`;
		return loginStatus;
	}
	try {
		const userExist = await userService.checkUserExist(username, password);
		if (userExist.isExist) {
			if (userExist.isActive) {
				const accessToken = jwt.sign({ username }, process.env.SECRETSTR, { expiresIn: '1d' });
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

module.exports = {
	userLogin,
};

