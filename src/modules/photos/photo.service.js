const { Error } = require('../../errors/error-handling');
const fs = require('fs');
const photoRepo = require('./photo.repository');
const userRepo = require('../users/user.repository');
const userAlbumRepo = require('../user-albums/user-album.repository');

const addPhotos = async photos => {
	try {
		const { albumId, description } = photos.infos;
		const user = await userRepo.findUserByAccount(photos.infos.account);
		const userId = user._id.toString();
		let hasPermission = true;
		let isExist = false;
		try {
			if (albumId) {
				hasPermission = await userAlbumRepo.checkUploadPermission(
					userId,
					albumId
				);
			}
			const photoNames = photos.files.map(item => {
				return { name: item.originalname };
			});
			isExist = await photoRepo.checkPhotoExist({
				userId,
				albumId,
				photoNames,
			});
			if (hasPermission && !isExist) {
				const listPhoto = photos.files.map(item => {
					return {
						userId,
						albumId,
						name: item.originalname,
						path: item.path,
						capacity: item.size,
						type: item.mimetype,
						description,
					};
				});
				try {
					await photoRepo.addPhotos(listPhoto);
				} catch (error) {
					console.log(error);
					throw new Error(500, 'fail to add photo');
				}
			} else {
				throw new Error(
					403,
					"Photo is exist or you don't have permission to upload"
				);
			}
		} catch (error) {
			if (error instanceof Error) throw error;
			else throw new Error(500, 'fail to check exist');
		}
	} catch (error) {
		photos.files.forEach(item => {
			fs.unlinkSync(item.path);
		});
		if (error instanceof Error) throw error;
		else throw new Error(500, 'fail to add photo');
	}
};

module.exports = {
	addPhotos,
};

