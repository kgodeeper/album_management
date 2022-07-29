const authService = require('./auth.service');

const userLogin = async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const loginStatus = await authService.userLogin(username, password);
	if (loginStatus.error) {
		res.sendStatus(500);
	} else {
		res.status(200).json({
			loginStatus,
		});
	}
};

module.exports = {
	userLogin,
};

