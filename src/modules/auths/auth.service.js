require('dotenv').config({ path: './src/configs/.env' });
const userService = require('../users/user.service');
const jwt = require('jsonwebtoken');

const userLogin = async (username, password) => {
	const loginStatus = {
		isLogin: true,
		isExist: true,
		accessToken: null,
		error: null,
	};
	const userExist = await userService.checkUserExist(username, password);
	if (userExist.error) {
		loginStatus.isLogin = false;
		loginStatus.error = userExist.error;
		loginStatus.isExist = false;
	} else {
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
	}
	return loginStatus;
};

module.exports = {
	userLogin,
};

