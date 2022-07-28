const { userModel } = require('./user.model');

const checkUserExist = async (username, password) => {
	try {
		const count = await userModel.find({ username, password }).count();
		return {
			isExist: !!count,
			error: null,
		};
	} catch (error) {
		return {
			isExist: null,
			error,
		};
	}
};

module.exports = {
	checkUserExist,
};

