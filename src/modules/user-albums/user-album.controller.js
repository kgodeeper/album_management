const userAlbumService = require('./user-album.service');

const addUserAlbum = async (req, res, next) => {
	try {
		await userAlbumService.addUserAlbum(req.body);
		res.status(200).json({ Added: true });
	} catch (error) {
		next(error);
	}
};

const getUserAlbums = async (req, res, next) => {
	try {
		const albums = await userAlbumService.getUserAlbums(req.body);
		res.status(200).json({ albums });
	} catch (error) {
		next(error);
	}
};

const getMembers = async (req, res, next) => {
	try {
		const members = await userAlbumService.getMembers(req.params.id);
		res.status(200).json({ members });
	} catch (error) {
		next(error);
	}
};
module.exports = {
	addUserAlbum,
	getUserAlbums,
	getMembers,
};

