const userAlbumRepo = require('./user-album.repository');

const addMember = async (userId, albumId, userRole) => {
	try {
		await userAlbumRepo.addMember({ userId, albumId, userRole });
	} catch (error) {
		throw error;
	}
};

const checkAlbumExist = async (userId, albumName) => {
	try {
		return await userAlbumRepo.checkAlbumExist({ userId, albumName });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = {
	addMember,
	checkAlbumExist,
};

