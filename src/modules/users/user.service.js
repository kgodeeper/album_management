require('dotenv').config({ path: './src/configs/.env' });
const crypto = require('crypto');
const fs = require('fs');
const userRepo = require('./user.repository');
const { sendVerifyMail } = require('../../utils/mail.util');
const { Error } = require('../../commons/error-handling');
const { sign, verify, decode } = require('../../utils/jwt.util');

/*  
	check user is exist
	?. is nullist operator, if before ? is null, expression return null
	else return expression value.
*/
const checkUserExist = async (account, password) => {
	try {
		let user =
			(await userRepo.findUserByUsername(account)) ||
			(await userRepo.findUserByEmail(account));
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

const userRegister = async (username, password, email, activationCode) => {
	let regisStatus = {
		isRegister: true,
		error: null,
	};
	try {
		let user =
			(await userRepo.findUserByUsername(username)) ||
			(await userRepo.findUserByEmail(email));
		console.log(user);
		if (!user) {
			await userRepo.addUser({
				username,
				password,
				email,
				activationCode,
			});
		} else {
			regisStatus.isRegister = false;
			regisStatus.error = `account already exist`;
		}
		return regisStatus;
	} catch (error) {
		throw error;
	}
};

const activeUser = async (activationCode, email) => {
	try {
		const user = await userRepo.findUserByEmail(email);
		if (
			user &&
			user.activationCode % 100000 === Number(activationCode) &&
			user.activationCode >= Number(new Date())
		) {
			await userRepo.activeUser(email);
			return true;
		} else return false;
	} catch (error) {
		throw error;
	}
};

const resendCode = async email => {
	try {
		const user = await userRepo.findUserByEmail(email);
		if (user) {
			const date = new Date();
			date.setMinutes(date.getMinutes() + 2);
			const activationCode = Number(date);
			await userRepo.changeActivationCode(email, activationCode);
			sendVerifyMail(email, activationCode);
		} else {
			throw new Error(200, `can't find user`);
		}
	} catch (error) {
		throw error;
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
			const token = sign(
				{ account: user.username },
				process.env.SECRETSTR,
				{
					expiresIn: '600s',
				}
			);
			return token;
		} else {
			return null;
		}
	} catch (error) {
		throw error;
	}
};

const changePasswordByToken = async (token, password) => {
	try {
		password = crypto.createHash('SHA256').update(password).digest('hex');
		verify(token, process.env.SECRETSTR);
		const payload = decode(token, process.env.SECRETSTR);
		if (payload.account) {
			await userRepo.changePasswordByUser(payload.account, password);
		} else return false;
		return true;
	} catch (error) {
		throw error;
	}
};

const updateUser = async info => {
	try {
		const payload = decode(info.token, process.env.SECRETSTR);
		if (payload.account) {
			const user =
				(await userRepo.findUserByEmail(payload.account)) ||
				(await userRepo.findUserByUsername(payload.account));
			if (user) {
				try {
					if (user.avatar) fs.unlinkSync(user.avatar);
				} catch (error) {}
				await userRepo.updateUser(payload.account, info);
				return true;
			}
			return false;
		} else return false;
	} catch (error) {
		throw error;
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
};

