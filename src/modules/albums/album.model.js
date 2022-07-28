const { mongoose } = require('../../utils/connect');

const albumSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		description: String,
		status: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const albumModel = mongoose.model('album', albumSchema);

module.exports = { albumModel };

