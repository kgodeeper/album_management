const userService = require('./user.service');
const { Error } = require('../../commons/error-handling');
const fs = require('fs');
const { validationUserInfo } = require('./user.validation');
const { uploadAvatar } = require('../../utils/upload.util');

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

const updateUser = async (req, res) => {
	const upload = uploadAvatar();
	try {
		upload(req, res, async error => {
			if (error) {
				res.status(200).json({ uploadError: 'fail to update user' });
			} else {
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
					try {
						const isUpdate = await userService.updateUser({
							fullname,
							address,
							gender,
							phone,
							dob,
							avatar,
							token,
						});
						res.status(200).json({ isUpdate });
					} catch (error) {
						throw error;
					}
				} else {
					fs.unlinkSync(avatar);
					res.status(500).json({
						error: valid.errorMessage,
					});
				}
			}
		});
	} catch (error) {
		throw error;
	}
};

module.exports = {
	activeUser,
	resendCode,
	changePasswordByToken,
	updateUser,
	verifyEmail,
};

