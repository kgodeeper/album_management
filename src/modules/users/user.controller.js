const userService = require('./user.service');

const verifyEmail = async (req, res) => {
	const { activationCode, email } = req.body;
	try {
		const isActive = await userService.verifyEmail(activationCode, email);
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

module.exports = {
	verifyEmail,
	resendCode,
};

