const { mongoose } = require('../../utils/connect');
const Schema = mongoose.Schema;

const userAlbumSchema = Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	albumId: { type: Schema.Types.ObjectId, required: true },
	userRole: { type: Number, default: 0 },
});

const userAlbumModel = mongoose.model('userAlbum', userAlbumSchema);

module.exports = { userAlbumModel };

