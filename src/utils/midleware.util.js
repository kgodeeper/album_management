require('dotenv').config({ path: './src/configs/.env' });
const { Error } = require('../errors/error-handling');
const { verify } = require('./jwt.util');

const loginRequire = (req, res, next) => {
	try {
		const token = req.get('Authorization').split(' ')[1];
		verify(token, process.env.SECRETSTR);
		req.body.token = token;
		next();
	} catch (error) {
		next(new Error(401, 'login require'));
	}
};

module.exports = {
	loginRequire,
};

