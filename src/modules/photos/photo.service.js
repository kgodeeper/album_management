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

const deletePhoto = async photoInfo => {
	try {
		const user = await userRepo.findUserByAccount(photoInfo.account);
		const userId = user._id.toString();
		const permission = await photoRepo.checkDelelePermission(
			userId,
			photoInfo.photoId
		);
		if (permission) {
			try {
				const photo = await photoRepo.findPhoto(photoInfo.photoId);
				await fs.unlinkSync(photo.path);
				await photo.remove();
			} catch (error) {
				throw new Error(500, 'Fail to delele photo');
			}
		} else {
			throw new Error(403, "You aren't owner");
		}
	} catch (error) {
		if (error instanceof Error) throw error;
		else throw new Error(500, 'Delete photo fail');
	}
};

const updatePhoto = async photoInfo => {
	try {
		const user = await userRepo.findUserByAccount(photoInfo.account);
		const userId = user._id.toString();
		const permission = await photoRepo.checkDelelePermission(
			userId,
			photoInfo.photoId
		);
		if (permission) {
			const isUpdate = await photoRepo.updatePhoto(photoInfo);
			if (!isUpdate.modifiedCount) {
				throw new Error(500, 'Photo with same name already exist');
			}
		} else {
			throw new Error(500, "you aren't owner");
		}
	} catch (error) {
		if (error instanceof Error) throw error;
		throw new Error(500, 'Fail to update photo');
	}
};
module.exports = {
	addPhotos,
	deletePhoto,
	updatePhoto,
};

