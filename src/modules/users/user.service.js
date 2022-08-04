require('dotenv').config({ path: './src/configs/.env' });
const crypto = require('crypto');
const fs = require('fs');
const userRepo = require('./user.repository');
const { sendVerifyMail, generateCode } = require('../../utils/mail.util');
const { Error } = require('../../errors/error-handling');
const { sign, verify, decode } = require('../../utils/jwt.util');

/*  
	check user is exist
	?. is nullist operator, if before ? is null, expression return null
	else return expression value.
*/
const checkUserExist = async (account, password) => {
	try {
		let user = await userRepo.findUserByAccount(account);
		if (user?.password !== password) {
			user = null;
		}
		return {
			isExist: !!user,
			isActive: !!user?.isActive,
		};
	} catch (error) {
		throw error;
	}
};

const userRegister = async info => {
	const { username, email } = info;
	const user =
		(await userRepo.findUserByUsername(username)) ||
		(await userRepo.findUserByEmail(email));
	if (user) {
		throw new Error(500, 'account already exist');
	}
	await userRepo.addUser(info);
};

const activeUser = async (activationCode, email) => {
	try {
		const user = await userRepo.findUserByEmail(email);
		if (
			user &&
			user.activationCode % 100000 === Number(activationCode) &&
			user.activationCode >= Number(new Date())
		) {
			try {
				await userRepo.activeUser(email);
			} catch (error) {
				throw error;
			}
			return true;
		} else {
			throw new Error();
		}
	} catch (error) {
		throw new Error(500, 'fail to active user');
	}
};

const resendCode = async email => {
	try {
		const user = await userRepo.findUserByEmail(email);
		if (user) {
			const activationCode = generateCode();
			await userRepo.changeActivationCode(email, activationCode);
			sendVerifyMail(email, activationCode);
		} else {
			throw new Error(500, `can't find user`);
		}
	} catch (error) {
		throw new Error(500, 'fail to resend mail');
	}
};

const verifyEmail = async (verifyCode, email) => {
	try {
		const user = await userRepo.findUserByEmail(email);
		if (
			user &&
			user.activationCode % 100000 === Number(verifyCode) &&
			user.activationCode >= Number(new Date())
		) {
			const token =
				sign({ account: user.username }, process.env.SECRETSTR, {
					expiresIn: '600s',
				}) || null;
			return token;
		} else {
			throw new Error(500, 'Fail to verify email');
		}
	} catch (error) {
		throw new Error(500, 'Email not exist');
	}
};

const changePasswordByToken = async (token, password) => {
	try {
		password = crypto.createHash('SHA256').update(password).digest('hex');
		verify(token, process.env.SECRETSTR);
		const payload = decode(token, process.env.SECRETSTR);
		if (payload.account) {
			await userRepo.changePasswordByUser(payload.account, password);
			return true;
		} else {
			throw new Error(500, "Can't find user");
		}
	} catch (error) {
		if (error.errorCode) {
			throw error;
		} else throw new Error('Fail to change password');
	}
};

const updateUser = async info => {
	try {
		const payload = decode(info.token, process.env.SECRETSTR);
		if (payload.account) {
			const user = await userRepo.findUserByAccount(payload.account);
			if (!user || user.avatar)
				try {
					await fs.unlinkSync(user.avatar);
				} catch (error) {}
			await userRepo.updateUser(payload.account, info);
		} else {
			throw new Error(500, "Can't find user");
		}
	} catch (error) {
		console.log(error);
		if (error.errorCode) {
			throw error;
		} else {
			throw new Error(500, 'fail to update user');
		}
	}
};

const getUserId = async account => {
	try {
		const user = await userRepo.findUserByAccount(account);
		return user._id.toString();
	} catch (error) {
		throw new Error(500, 'Get user fail');
	}
};

module.exports = {
	checkUserExist,
	userRegister,
	activeUser,
	resendCode,
	verifyEmail,
	updateUser,
	changePasswordByToken,
	getUserId,
};

