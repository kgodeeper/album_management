const { Error } = require('../../errors/error-handling');
const fs = require('fs');
const photoRepo = require('./photo.repository');
const userRepo = require('../users/user.repository');
const { getUserId } = require('../users/user.service');
const userAlbumRepo = require('../user-albums/user-album.repository');

const addPhotos = async photos => {
	try {
		const { albumId, description } = photos.infos;
		const userId = await getUserId(photos.infos.account);
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
			try {
				isExist = await photoRepo.checkPhotoExist({
					userId,
					albumId,
					photoNames,
				});
			} catch (error) {
				console.log(error);
			}
			if (hasPermission) {
				if (!isExist) {
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
						throw new Error(500, 'fail to add photo');
					}
				} else {
					throw new Error(
						500,
						'Photo with the same name already exist'
					);
				}
			} else {
				throw new Error(403, "You don't have permission to upload");
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
		const userId = await getUserId(photoInfo.account);
		const permission = await photoRepo.checkPermission(
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
		const userId = await getUserId(photoInfo.account);
		const permission = await photoRepo.checkPermission(
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

const replacePhoto = async photoInfo => {
	try {
		const userId = await getUserId(photoInfo.account);
		let permission = await photoRepo.checkPermission(
			userId,
			photoInfo.photoId
		);
		if (photoInfo.albumId) {
			permission =
				permission &&
				(await userAlbumRepo.checkMemberExist({
					userId,
					albumId: photoInfo.albumId,
				}));
		}
		if (permission) {
			isReplace = await photoRepo.replacePhoto(photoInfo);
			if (!isReplace) {
				throw new Error(
					500,
					'Photo with the same name already exist on this album'
				);
			}
		} else {
			throw new Error(500, 'You dont have permission');
		}
	} catch (error) {
		if (error instanceof Error) throw error;
		throw new Error(500, 'Fail to replace photo');
	}
};

const getListPhotos = async info => {
	try {
		const userId = await getUserId(info.account);
		return await photoRepo.getPhotosByUser(userId);
	} catch (error) {
		throw new Error(500, 'Fail to get photos');
	}
};

const getPhoto = async photoId => {
	try {
		const path = await photoRepo.getPhotoPath(photoId);
		return path;
	} catch (error) {
		throw new Error(400, 'photo is not exist');
	}
};

module.exports = {
	addPhotos,
	deletePhoto,
	updatePhoto,
	replacePhoto,
	getListPhotos,
	getPhoto,
};

