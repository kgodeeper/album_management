const authService = require('./auth.service');

const userLogin = async (req, res) => {
	const { account, password } = req.body;
	try {
		const loginStatus = await authService.userLogin(account, password);
		res.status(200).json({
			loginStatus,
		});
	} catch (error) {
		throw error;
	}
};

const userRegister = async (req, res) => {
	const { username, password, email } = req.body;
	try {
		const regisStatus = await authService.userRegister(
			username,
			password,
			email
		);
		res.status(200).json({
			regisStatus,
		});
	} catch (error) {
		throw error;
	}
};

module.exports = {
	userLogin,
	userRegister,
};

