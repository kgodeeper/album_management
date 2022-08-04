const userService = require('./user.service');
const fs = require('fs');
const { Error } = require('../../errors/error-handling');
const { validationUserInfo } = require('./user.validation');
const { uploadAvatar } = require('../../utils/upload.util');

const activeUser = async (req, res, next) => {
	const { activationCode, email } = req.body;
	try {
		const isActive = await userService.activeUser(activationCode, email);
		res.status(200).json({ isActive });
	} catch (error) {
		next(error);
	}
};

const resendCode = async (req, res, next) => {
	try {
		await userService.resendCode(req.body.email);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};

const changePasswordByToken = async (req, res, next) => {
	const { token, password } = req.body;
	try {
		const isChange = await userService.changePasswordByToken(
			token,
			password
		);
		res.status(200).json({ isChange });
	} catch (error) {
		next(error);
	}
};

const verifyEmail = async (req, res, next) => {
	const { verifyCode, email } = req.body;
	try {
		const resetPassToken = await userService.verifyEmail(verifyCode, email);
		res.status(200).json({ resetPassToken });
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const upload = uploadAvatar();
		upload(req, res, async error => {
			if (!error) {
				const { fullname, address, gender, phone, dob } = req.body;
				const token = req.get('Authorization').split(' ')[1];
				const avatar = req.file.path;
				const valid = await validationUserInfo({
					fullname,
					address,
					gender,
					phone,
					dob,
				});
				if (!valid) {
					await userService.updateUser({
						fullname,
						address,
						gender,
						phone,
						dob,
						avatar,
						token,
					});
					res.status(200).json({ isUpdate: true });
				} else {
					await fs.unlinkSync(avatar);
				}
			} else {
				console.log(error);
			}
		});
	} catch (error) {
		if (error instanceof Error) next(error);
		next(new Error(500, 'Error'));
	}
};

module.exports = {
	activeUser,
	resendCode,
	changePasswordByToken,
	updateUser,
	verifyEmail,
};

