require('dotenv').config({ path: './src/configs/.env' });
const { decode } = require('../../utils/jwt.util');
const albumRepo = require('./album.repository');
const userAlbumService = require('../user-albums/user-album.service');
const userRepo = require('../users/user.repository');
const { Error } = require('../../errors/error-handling');

const createAlbum = async albumInfo => {
	try {
		const { account } = albumInfo;
		const user = await userRepo.findUserByAccount(account);
		const userId = user._id.toString();
		const isExist = await userAlbumService.checkAlbumExist(
			userId,
			albumInfo.name
		);
		console.log(isExist);
		if (isExist) throw new Error(500, 'Album already exist');
		const albumId = await albumRepo.createAlbum(albumInfo);
		await userAlbumService.addMember({
			userId,
			albumId: albumId._id,
			userRole: 1,
		});
	} catch (error) {
		if (error.errorCode) throw error;
		else throw new Error(500, 'Unable to create album');
	}
};

const checkAlbumOwner = async albumInfo => {
	const { account, albumId } = albumInfo;
	const user = await userRepo.findUserByAccount(account);
	const userId = user._id.toString();
	return await userAlbumService.checkAlbumOwner(userId, albumId);
};

const updateAlbum = async albumInfo => {
	try {
		const isOwner = await checkAlbumOwner(albumInfo);
		if (isOwner) {
			await albumRepo.updateAlbum(albumInfo);
		} else {
			throw new Error(403, "You are't owner");
		}
	} catch (error) {
		if (error.errorCode) throw error;
		else throw new Error(500, 'Update album fail');
	}
};

const deleteAlbum = async albumInfo => {
	try {
		const isOwner = await checkAlbumOwner(albumInfo);
		if (isOwner) {
			await albumRepo.deleteAlbum(albumInfo);
			await userAlbumService.deleteAllMembers(albumInfo.albumId);
			// delete photo here
		} else {
			throw new Error(403, "You are't owner");
		}
	} catch (error) {
		if (error.errorCode) throw error;
		else throw new Error(500, 'Delete album fail');
	}
};
module.exports = {
	createAlbum,
	updateAlbum,
	deleteAlbum,
};

