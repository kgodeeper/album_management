const userRepo = require('./user.repository');

const checkUserExist = async (username, password) => {
	return await userRepo.checkUserExist(username, password);
};

module.exports = {
	checkUserExist,
};

