const authService = require('./auth.service');
const crypto = require('crypto');

const userLogin = async (req, res) => {
	const username = req.body.username;
	let password = req.body.password;
	password = crypto.createHash('SHA256').update(password).digest('hex');
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

