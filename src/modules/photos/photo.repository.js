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

const checkPermission = async (userId, photoId) => {
	return !!(await photoModel.find({ userId, photoId }).count());
};

const findPhoto = async photoId => {
	return await photoModel.findOne({ _id: photoId });
};

const updatePhoto = async photoInfo => {
	const { photoId, name, description } = photoInfo;
	return await photoModel.updateOne(
		{ _id: photoId, name: { $not: { $regex: name } } },
		{ $set: { name, description } }
	);
};

const replacePhoto = async photoInfo => {
	const { photoId, albumId } = photoInfo;
	if (!albumId)
		await photoModel.updateOne(
			{ _id: photoId },
			{ $unset: { albumId: '' } }
		);
	return await photoModel.updateOne({ _id: photoId }, { $set: { albumId } });
};

module.exports = {
	addPhotos,
	checkPhotoExist,
	findPhoto,
	checkPermission,
	updatePhoto,
	replacePhoto,
};

