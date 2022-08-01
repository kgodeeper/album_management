const { userModel } = require('./user.model');

const findUserByUsername = async username => {
	return await userModel.findOne({ username }).lean();
};

const addUser = async user => {
	return await userModel.create(user);
};

const findUserByEmail = async email => {
	return await userModel.findOne({ email }).lean();
};

const findUserByAccount = async account => {
	return await userModel
		.findOne({ $or: [{ username: account }, { email: account }] })
		.lean();
};

const activeUser = async email => {
	await userModel.updateOne({ email }, { $set: { isActive: true } });
};

const changeActivationCode = async (email, activationCode) => {
	await userModel.updateOne({ email }, { $set: { activationCode } });
};

const changePasswordByUser = async (account, password) => {
	await userModel.updateOne(
		{ $or: [{ username: account }, { email: account }] },
		{ $set: { password } }
	);
};

const updateUser = async (account, info) => {
	await userModel.updateOne(
		{ $or: [{ username: account }, { email: account }] },
		{ $set: info }
	);
};

module.exports = {
	findUserByUsername,
	findUserByEmail,
	findUserByAccount,
	addUser,
	activeUser,
	updateUser,
	changeActivationCode,
	changePasswordByUser,
};

