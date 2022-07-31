require('dotenv').config({ path: './src/configs/.env' });
const crypto = require('crypto');
const userRepo = require('./user.repository');
const { sendVerifyMail } = require('../../utils/mail/mail.util');
const { Error } = require('../../commons/errors/error-handling');
const { sign, verify, decode } = require('../../utils/jwt/jwt.util');

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
				{ username: user.username },
				process.env.MAILSECRETSTR,
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
		verify(token, process.env.MAILSECRETSTR);
		const payload = decode(token, process.env.MAILSECRETSTR);
		if (payload.username) {
			await userRepo.changePasswordByUser(payload.username, password);
		} else return false;
		return true;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = {
	checkUserExist,
	userRegister,
	activeUser,
	resendCode,
	verifyEmail,
	changePasswordByToken,
};

