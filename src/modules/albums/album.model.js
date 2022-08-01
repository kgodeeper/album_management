const { mongoose } = require('../../configs/database');
const { userAlbumModel } = require('../user-albums/user-album.model');

const albumSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		description: { type: String, default: '' },
		status: { type: Number, default: 1 },
	},
	{
		timestamps: true,
	}
);

const albumModel = mongoose.model('album', albumSchema);

module.exports = { albumModel };

