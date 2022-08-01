const albumService = require('./album.service');

const createAlbum = async (req, res, next) => {
	try {
		await albumService.createAlbum(req.body);
		res.status(200).json({ isCreate: true });
	} catch (error) {
		next(error);
	}
};

const updateAlbum = async (req, res, next) => {
	try {
		const albumId = req.params.id;
		await albumService.updateAlbum({ albumId, ...req.body });
		res.status(200).json({ isUpdate: true });
	} catch (error) {
		next(error);
	}
};

const deleteAlbum = async (req, res, next) => {
	try {
		const albumId = req.params.id;
		await albumService.deleteAlbum({ albumId, ...req.body });
		res.status(200).json({ isDelete: true });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createAlbum,
	updateAlbum,
	deleteAlbum,
};

