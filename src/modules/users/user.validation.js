const joi = require('joi');

const activeCodeSchema = joi.object({
	activationCode: joi.string().pattern(new RegExp('[0-9]{5}')).required(),
	email: joi
		.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } })
		.required(),
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

module.exports = {
	validateActiveCode,
};

