const { databaseError } = require('../../commons/const');
const { userAlbumModel } = require('./user-album.model');
const { albumModel } = require('../albums/album.model');

const addMember = async info => {
	const { userId, albumId, userRole } = info;
	await userAlbumModel.create({ userId, albumId, userRole });
};

const checkMemberExist = async info => {
	const { userId, albumId } = info;
	return !!(await userAlbumModel.find({ userId, albumId }).count());
};

const checkAlbumExist = async info => {
	const { userId, albumName } = info;
	const albums = await userAlbumModel
		.find({ userId })
		.populate({ path: 'albumId', model: albumModel });
	return !!albums.find(item => item.albumId.name === albumName);
};

const checkAlbumOwner = async info => {
	const { userId, albumId } = info;
	return await userAlbumModel.find({ userId, albumId, userRole: 1 }).count();
};

const deleteAllMembers = async albumId => {
	await userAlbumModel.deleteMany({ albumId });
};

module.exports = {
	addMember,
	checkAlbumExist,
	checkAlbumOwner,
	deleteAllMembers,
	checkMemberExist,
};

