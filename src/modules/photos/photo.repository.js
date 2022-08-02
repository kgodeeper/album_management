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

module.exports = {
	addPhotos,
	checkPhotoExist,
};

