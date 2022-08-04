/* istanbul ignore file */
require('dotenv').config({ path: './src/configs/.env' });
const { Error } = require('../errors/error-handling');
const { verify, decode } = require('./jwt.util');

const loginRequire = async (req, res, next) => {
	try {
		const token = req.get('Authorization').split(' ')[1];
		verify(token, process.env.SECRETSTR);
		const payload = decode(token);
		req.body.token = token;
		req.body.account = payload.account;
		next();
	} catch (error) {
		next(new Error(401, 'login require'));
	}
};

module.exports = {
	loginRequire,
};

