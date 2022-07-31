const userService = require('./user.service');

const activeUser = async (req, res) => {
	const { activationCode, email } = req.body;
	try {
		const isActive = await userService.activeUser(activationCode, email);
		res.status(200).json({ activeStatus: isActive });
	} catch (error) {
		throw error;
	}
};

const resendCode = async (req, res) => {
	const email = req.body.email;
	try {
		await userService.resendCode(email);
		res.sendStatus(200);
	} catch (error) {
		throw error;
	}
};

const changePasswordByToken = async (req, res) => {
	const { token, password } = req.body;
	try {
		const isChange = await userService.changePasswordByToken(
			token,
			password
		);
		res.status(200).json({ isChange });
	} catch (error) {
		throw error;
	}
};

const verifyEmail = async (req, res) => {
	const { verifyCode, email } = req.body;
	try {
		const resetPassToken = await userService.verifyEmail(verifyCode, email);
		res.status(200).json({ resetPassToken });
	} catch (error) {
		throw error;
	}
};

module.exports = {
	activeUser,
	resendCode,
	changePasswordByToken,
	verifyEmail,
};

