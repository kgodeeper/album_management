const authService = require('./auth.service');

const userLogin = async (req, res, next) => {
	const { account, password } = req.body;
	try {
		const accessToken = await authService.userLogin(account, password);
		res.status(200).json({
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};

const userRegister = async (req, res, next) => {
	const { username, password, email } = req.body;
	try {
		const isRegister = await authService.userRegister({
			username,
			password,
			email,
		});
		res.status(200).json({
			isRegister,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	userLogin,
	userRegister,
};

