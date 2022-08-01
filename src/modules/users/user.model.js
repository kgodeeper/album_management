const { mongoose } = require('../../configs/database');
const scrypto = require('crypto');

const userSchema = mongoose.Schema(
	{
		username: { type: String, required: true, minLength: 6 },
		password: { type: String, required: true },
		email: { type: String, required: true },
		fullname: String,
		dob: Date,
		gender: { type: Boolean, default: true },
		phone: String,
		isActive: { type: Boolean, required: true, default: false },
		activationCode: Number,
		address: String,
		avatar: String,
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.model('user', userSchema);

module.exports = { userModel };

