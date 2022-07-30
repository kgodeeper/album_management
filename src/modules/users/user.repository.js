const { userModel } = require('./user.model');
const { databaseError } = require('../../commons/const');

/*  
	check user is exist
	?. is nullist operator, if before ? is null, expression return null
	else return expression value.
*/
const checkUserExist = async (username, password) => {
	try {
		const user = await userModel.findOne({ username, password });
		return {
			isExist: !!user,
			isActive: !!user?.isActive,
		};
	} catch (error) {
		console.log(error);
		throw databaseError;
	}
};

module.exports = {
	checkUserExist,
};

