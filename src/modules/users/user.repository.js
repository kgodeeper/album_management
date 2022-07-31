const { userModel } = require('./user.model');
const { databaseError } = require('../../commons/const');

const findUserByUsername = async username => {
	try {
		return await userModel.findOne({ username }).lean();
	} catch (error) {
		throw databaseError;
	}
};

const addUser = async user => {
	try {
		await userModel.create(user);
	} catch (error) {
		throw databaseError;
	}
};

const findUserByEmail = async email => {
	try {
		return await userModel.findOne({ email }).lean();
	} catch (error) {
		throw databaseError;
	}
};

const activeUser = async email => {
	try {
		await userModel.updateOne({ email }, { $set: { isActive: true } });
	} catch (error) {
		throw databaseError;
	}
};

const changeActivationCode = async (email, activationCode) => {
	try {
		await userModel.updateOne({ email }, { $set: { activationCode } });
	} catch (error) {
		throw databaseError;
	}
};

const changePasswordByUser = async (username, password) => {
	try {
		await userModel.updateOne({ username }, { $set: { password } });
	} catch (error) {
		throw databaseError;
	}
};
module.exports = {
	findUserByUsername,
	findUserByEmail,
	addUser,
	activeUser,
	changeActivationCode,
	changePasswordByUser,
};

