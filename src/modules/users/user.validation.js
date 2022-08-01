const joi = require('joi');
const { Error } = require('../../commons/error-handling');

const activeCodeSchema = joi.object({
	activationCode: joi.string().pattern(new RegExp('[0-9]{5}')).required(),
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
		.required(),
});

const changePassSchema = joi
	.object({
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
	})
	.with('password', 'rePassword');

const userInfoSchema = joi.object({
	fullname: joi.string().pattern(new RegExp('^[A-Za-z ]{2,}$')),
	address: joi.string(),
	dob: joi.date(),
	phone: joi.string().pattern(new RegExp('^0[0-9]{9,}$')),
	gender: joi.bool(),
});

const validateActiveCode = async (req, res, next) => {
	const { activationCode, email } = req.body;
	try {
		await activeCodeSchema.validateAsync({ activationCode, email });
		next();
	} catch (error) {
		next(new Error(200, error.details[0].message));
	}
};

const validationChangePass = async (req, res, next) => {
	const { token, password, rePassword } = req.body;
	try {
		await changePassSchema.validateAsync({ token, password, rePassword });
		next();
	} catch (error) {
		next(new Error(200, error.details[0].message));
	}
};

const validationUserInfo = async info => {
	try {
		await userInfoSchema.validateAsync(info);
		return null;
	} catch (error) {
		return new Error(200, error.details[0].message);
	}
};

module.exports = {
	validateActiveCode,
	validationChangePass,
	validationUserInfo,
};

