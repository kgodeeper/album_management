const userAlbumRepo = require('./user-album.repository');
const userRepo = require('../users/user.repository');
const { Error } = require('../../errors/error-handling');

const addMember = async info => {
	try {
		await userAlbumRepo.addMember(info);
	} catch (error) {
		throw new Error(500, 'Failure to add member');
	}
};

const checkAlbumExist = async (userId, albumName) => {
	try {
		return await userAlbumRepo.checkAlbumExist({ userId, albumName });
	} catch (error) {
		throw new Error(500, "Can't check album");
	}
};

const checkAlbumOwner = async (userId, albumId) => {
	try {
		return await userAlbumRepo.checkAlbumOwner({ userId, albumId });
	} catch (error) {
		throw new Error(500, "Can't find album owner");
	}
};

const deleteAllMembers = async albumId => {
	try {
		await userAlbumRepo.deleteAllMembers(albumId);
	} catch (error) {
		throw new Error(500, 'Cant delete members');
	}
};

const addUserAlbum = async info => {
	try {
		info.role = 0;
		const { account, albumId } = info;
		const owner = await userRepo.findUserByAccount(account);
		const ownerId = owner._id.toString();
		const isOwner = await userAlbumRepo.checkAlbumOwner({
			userId: ownerId,
			albumId,
		});
		if (isOwner) {
			const isExist = await userAlbumRepo.checkMemberExist(info);
			if (isExist) throw new Error(500, 'Member already exist');
			await userAlbumRepo.addMember(info);
		} else throw new Error(500, "You aren't owner");
	} catch (error) {
		console.log(error);
		if (error.errorCode) throw error;
		else throw new Error(500, 'Cant add members');
	}
};

module.exports = {
	addMember,
	checkAlbumExist,
	checkAlbumOwner,
	deleteAllMembers,
	addUserAlbum,
};

