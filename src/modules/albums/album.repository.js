const { databaseError } = require('../../commons/const');
const { albumModel } = require('./album.model');

const createAlbum = async albumInfo => {
	const { name, description, status } = albumInfo;
	return await albumModel.create({ name, description, status });
};

module.exports = {
	createAlbum,
};

