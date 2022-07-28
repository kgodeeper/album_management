require('dotenv').config({ path: './src/configs/.env' });
const userService = require('../users/user.service');
const jwt = require('jsonwebtoken');

const userLogin = async (username, password) => {
	const loginStatus = {
		isLogin: true,
		accessToken: null,
		error: null,
	};
	const userExist = await userService.checkUserExist(username, password);
	if (userExist.error) {
		responeData.isLogin = false;
		responeData.error = error;
	} else {
		if (userExist.isExist) {
			const accessToken = jwt.sign({ username }, process.env.SECRETSTR, { expiresIn: '1d' });
			loginStatus.accessToken = accessToken;
		} else {
			loginStatus.isLogin = false;
		}
	}
	return loginStatus;
};

module.exports = {
	userLogin,
};

