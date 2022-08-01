const { databaseError } = require('../../commons/const');
const { albumModel } = require('./album.model');

const createAlbum = async albumInfo => {
	try {
		const { name, description, status } = albumInfo;
		return await albumModel.create({ name, description, status });
	} catch (error) {
		throw databaseError;
	}
};

module.exports = {
	createAlbum,
};

