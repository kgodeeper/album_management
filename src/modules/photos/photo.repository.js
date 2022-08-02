const { photoModel } = require('./photo.model');

const addPhotos = async photoInfo => {
	await photoModel.insertMany(photoInfo);
};

const checkPhotoExist = async photoInfo => {
	const { userId, albumId } = photoInfo;
	return !!(await photoModel
		.find({ userId, albumId, $or: photoInfo.photoNames })
		.count());
};

const checkDelelePermission = async (userId, photoId) => {
	return !!(await photoModel.find({ userId, photoId }).count());
};

const findPhoto = async photoId => {
	return await photoModel.findOne({ _id: photoId });
};

module.exports = {
	addPhotos,
	checkPhotoExist,
	findPhoto,
	checkDelelePermission,
};

