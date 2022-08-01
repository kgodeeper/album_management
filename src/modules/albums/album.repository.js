const { databaseError } = require('../../commons/const');
const { albumModel } = require('./album.model');

const createAlbum = async albumInfo => {
	const { name, description, status } = albumInfo;
	return await albumModel.create({ name, description, status });
};

const updateAlbum = async albumInfo => {
	const { albumId, name, description, status } = albumInfo;
	await albumModel.updateOne(
		{ _id: albumId },
		{ $set: { name, description, status } }
	);
};

const deleteAlbum = async albumInfo => {
	const { albumId } = albumInfo;
	await albumModel.deleteOne({ _id: albumId });
};

module.exports = {
	createAlbum,
	updateAlbum,
	deleteAlbum,
};

