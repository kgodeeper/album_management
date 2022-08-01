const userAlbumService = require('./album.service');

const createAlbum = async (req, res, next) => {
	try {
		const { name, description, status, token } = req.body;
		await userAlbumService.createAlbum({
			name,
			description,
			status,
			token,
		});
		res.status(200).json({ isCreate: true });
	} catch (error) {
		next(error);
	}
};

const updateAlbum = async (req, res) => {
	try {
		const { name, description, status, token } = req.body;
		const isUpdate = await userAlbumSerive.updateAlbum({
			name,
			description,
			status,
			token,
		});
		res.status(200).json({ isUpdate });
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createAlbum,
	updateAlbum,
};

