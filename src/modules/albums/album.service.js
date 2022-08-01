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
			if (!isExist) {
				const albumId = await albumRepo.createAlbum(albumInfo);
				await userAlbumService.addMember(userId, albumId._id, 1);
			} else {
				return false;
			}
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw error;
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

