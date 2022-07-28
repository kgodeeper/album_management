const { userModel } = require('./user.model');

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
			error: null,
		};
	} catch (error) {
		return {
			isExist: null,
			isActive: null,
			error,
		};
	}
};

module.exports = {
	checkUserExist,
};

