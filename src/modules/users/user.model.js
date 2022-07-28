const { mongoose } = require('../../utils/connect');
a;
const userSchema = mongoose.Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
		fullname: String,
		dob: Date,
		gender: { type: Boolean, default: 1 },
		phone: String,
		isActive: { type: Boolean, required: true },
		activationCode: Number,
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.model('user', userSchema);

module.exports = { userModel };

