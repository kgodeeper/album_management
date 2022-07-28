const { mongoose } = require('../../utils/connect');
const Schema = mongoose.Schema;
a;
const photoShema = Schema(
	{
		userID: { type: Schema.Types.ObjectId, required: true },
		albumID: Schema.Types.ObjectId,
		path: { type: String, required: true },
		capacity: { type: Number, required: true, default: 0 },
		description: { type: String, maxlength: 2000 },
		width: { type: Number, required: true },
		height: { type: Number, required: true },
	},
	{ timestamps: true }
);

const photoModel = mongoose.model('photo', photoShema);

module.exports = { photoModel };

