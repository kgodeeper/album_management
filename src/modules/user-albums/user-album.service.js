const userAlbumRepo = require('./user-album.repository');

const addMember = async info => {
	await userAlbumRepo.addMember(info);
};

const checkAlbumExist = async (userId, albumName) => {
	return await userAlbumRepo.checkAlbumExist({ userId, albumName });
};

module.exports = {
	addMember,
	checkAlbumExist,
};

