const joi = require('joi');

const activeCodeSchema = joi.object({
	activationCode: joi.string().pattern(new RegExp('[0-9]{5}')).required(),
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
		.required(),
});

const changePassSchema = joi.object({
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } }),
	password: joi
		.string()
		.pattern(
			new RegExp(
				'(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&/])[a-zA-Z0-9@$!%*#?&/]{8,}$'
			)
		)
		.required(),
	rePassword: joi.ref('password'),
});

const forgotPassSchema = joi.object({
	token: joi.string(),
	password: joi
		.string()
		.pattern(
			new RegExp(
				'(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&/])[a-zA-Z0-9@$!%*#?&/]{8,}$'
			)
		)
		.required(),
	rePassword: joi.ref('password'),
});

const validateActiveCode = (req, res, next) => {
	const { activationCode, email } = req.body;
	try {
		activeCodeSchema.validateAsync({ activationCode, email });
		next();
	} catch (error) {
		throw error;
	}
};

const validationForgotPassword = (req, res, next) => {
	const { token, password, rePassword } = req.body;
	try {
		forgotPassSchema.validateAsync({ token, password, rePassword });
		next();
	} catch (error) {
		throw error;
	}
};

module.exports = {
	validateActiveCode,
};

