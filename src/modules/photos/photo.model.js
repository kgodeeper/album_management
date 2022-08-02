const { mongoose } = require('../../configs/database');
const Schema = mongoose.Schema;

const photoShema = Schema(
	{
		userId: { type: Schema.Types.ObjectId, required: true },
		albumId: { type: Schema.Types.ObjectId },
		name: { type: String, required: true },
		path: { type: String, required: true },
		capacity: { type: Number, required: true, default: 0 },
		type: { type: String, required: true },
		description: { type: String, maxlength: 2000 },
	},
	{ timestamps: true }
);

const photoModel = mongoose.model('photo', photoShema);

module.exports = { photoModel };

