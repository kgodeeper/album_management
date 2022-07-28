const { mongoose } = require('../../utils/connect');
const Schema = mongoose.Schema;
a;
const userAlbumSchema = Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	albumId: { type: Schema.Types.ObjectId, required: true },
});

const userAlbumModel = mongoose.model('userAlbum', userAlbumSchema);

module.exports = { userAlbumModel };

