const userRepo = require('./user.repository');

const checkUserExist = async (username, password) => {
	try {
		return await userRepo.checkUserExist(username, password);
	} catch (error) {
		throw new Error(200, error);
	}
};

module.exports = {
	checkUserExist,
};

