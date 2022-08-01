const userAlbumService = require('./user-album.service');

const addUserAlbum = async (req, res, next) => {
	try {
		await userAlbumService.addUserAlbum(req.body);
		res.status(200).json({ Added: true });
	} catch (error) {
		next(error);
	}
};
module.exports = {
	addUserAlbum,
};

