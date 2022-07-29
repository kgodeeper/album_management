const authService = require('./auth.service');

const userLogin = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	try {
		const loginStatus = await authService.userLogin(username, password);
		res.status(200).json({
			loginStatus,
		});
	} catch (error) {
		throw new Error(200, error);
	}
};

module.exports = {
	userLogin,
};

