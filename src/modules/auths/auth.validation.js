const joi = require('joi');
const { Error } = require('../../commons/error-handling');

const accountSchema = joi
	.object({
		username: joi
			.string()
			.pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9]{5,}'))
			.required(),
		password: joi
			.string()
			.pattern(
				new RegExp(
					'(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&/])[a-zA-Z0-9@$!%*#?&/]{8,}$'
				)
			)
			.required(),
		rePassword: joi.ref('password'),
		email: joi
			.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } }),
	})
	.with('password', 'rePassword');

const loginSchema = joi.object({
	account: joi.string().required(),
	password: joi.string().required(),
});

const validateLogin = async (req, res, next) => {
	const { account, password } = req.body;
	try {
		await loginSchema.validateAsync({
			account,
			password,
		});
		next();
	} catch (error) {
		next(new Error(200, error.details[0].message));
	}
};

const validateRegis = async (req, res, next) => {
	const { username, password, rePassword, email } = req.body;
	try {
		await accountSchema.validateAsync({
			username,
			password,
			rePassword,
			email,
		});
		next();
	} catch (error) {
		next(new Error(200, error.details[0].message));
	}
};

module.exports = {
	validateRegis,
	validateLogin,
};

