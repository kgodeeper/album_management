require('dotenv').config({ path: './src/configs/.env' });
const userService = require('../users/user.service');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userLogin = async (username, password) => {
	const loginStatus = {
		isLogin: true,
		isExist: true,
		accessToken: null,
	};
	try {
		password = crypto.createHash('SHA256').update(password).digest('hex');
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
		throw new Error(200, error);
	}
	return loginStatus;
};

module.exports = {
	userLogin,
};

