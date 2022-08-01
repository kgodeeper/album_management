const { databaseError } = require('../../commons/const');
const { userAlbumModel } = require('./user-album.model');
const { userModel } = require('../users/user.model');
const { albumModel } = require('../albums/album.model');

const addMember = async info => {
	try {
		const { userId, albumId, userRole } = info;
		await userAlbumModel.create({ userId, albumId, userRole });
	} catch (error) {
		console.log(error);
		throw databaseError;
	}
};

const checkAlbumExist = async info => {
	try {
		const { userId, albumName } = info;
		const albums = await userAlbumModel
			.find({ userId })
			.populate({ path: 'albumId', model: albumModel });
		return !!albums.find(item => item.albumId.name === albumName);
	} catch (error) {
		console.log(error);
		throw databaseError;
	}
};

module.exports = {
	addMember,
	checkAlbumExist,
};

