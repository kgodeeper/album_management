const jwt = require('jsonwebtoken');
const { Error } = require('../../commons/errors/error-handling');

const sign = (payload, secret, options) => {
	try {
		return jwt.sign(payload, secret, options);
	} catch (error) {
		throw new Error(500, 'JWT Error');
	}
};

const verify = (token, secret) => {
	try {
		jwt.verify(token, secret);
		return true;
	} catch (error) {
		throw new Error(200, `${error}`);
	}
};

const decode = token => {
	try {
		return jwt.decode(token);
	} catch (error) {
		throw new Error(200, `${error}`);
	}
};

module.exports = {
	sign,
	verify,
	decode,
};

