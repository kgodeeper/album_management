const userRepo = require('./user.repository');

const checkUserExist = async (username, password) => {
	try {
		return await userRepo.checkUserExist(username, password);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	checkUserExist,
};

