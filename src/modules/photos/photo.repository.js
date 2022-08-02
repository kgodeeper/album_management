const { photoModel } = require('./photo.model');
const { userModel } = require('../users/user.model');
const { albumModel } = require('../albums/album.model');

const addPhotos = async photoInfo => {
	await photoModel.insertMany(photoInfo);
};

const checkPhotoExist = async photoInfo => {
	const { userId, albumId, photoNames } = photoInfo;
	const condition = { userId, albumId, $or: photoNames };
	if (!albumId) {
		delete condition.albumId;
	} else {
		delete condition.userId;
	}
	return !!(await photoModel.find(condition).count());
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

const getPhotosByUser = async userId => {
	return await photoModel
		.find({ userId })
		.populate({
			path: 'userId',
			select: ['username'],
			model: userModel,
		})
		.populate({
			path: 'albumId',
			select: ['name', 'status'],
			model: albumModel,
		});
};

const getPhotoPath = async photoId => {
	const photoParams = await photoModel.findOne({ _id: photoId }).lean();
	return photoParams.path;
};

module.exports = {
	addPhotos,
	checkPhotoExist,
	findPhoto,
	checkPermission,
	updatePhoto,
	replacePhoto,
	getPhotosByUser,
	getPhotoPath,
};

