const userAlbumService = require('./album.service');

const createAlbum = async (req, res) => {
	try {
		const { name, description, status, token } = req.body;
		const isCreate = await userAlbumService.createAlbum({
			name,
			description,
			status,
			token,
		});
		res.status(200).json({ isCreate });
	} catch (error) {
		throw error;
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

