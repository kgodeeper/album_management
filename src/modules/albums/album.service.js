require('dotenv').config({ path: './src/configs/.env' });
const { decode } = require('../../utils/jwt.util');
const albumRepo = require('./album.repository');
const userAlbumService = require('../user-albums/user-album.service');
const userRepo = require('../users/user.repository');

const createAlbum = async albumInfo => {
	try {
		const payload = decode(albumInfo.token, process.env.SECRETSTR);
		const user = await userRepo.findUserByAccount(payload.account);
		if (user) {
			const userId = user._id.toString();
			const isExist = await userAlbumService.checkAlbumExist(
				userId,
				albumInfo.name
			);
			if (isExist) throw new Error(500, 'Album already exist');
			const albumId = await albumRepo.createAlbum(albumInfo);
			await userAlbumService.addMember({
				userId,
				albumId: albumId._id,
				userRole: 1,
			});
		} else {
			throw new Error(500, "Can't find user");
		}
	} catch (error) {
		if (error.errorCode) throw error;
		else throw new Error(500, 'Unable to create album');
	}
};

const updateAlbum = async info => {
	try {
		const payload = decode(albumInfo.token, process.env.SECRETSTR);
		const user = await userRepo.findUserByAccount(payload.account);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createAlbum,
	updateAlbum,
};

