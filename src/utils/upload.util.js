const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { Error } = require('../errors/error-handling');
const acceptFile = ['.jpg', '.png', '.jpeg', '.bmp', '.gif'];

const fileFilter = (req, file, cb) => {
	try {
		const ext = path.extname(file.originalname);
		if (acceptFile.includes(ext.toLowerCase())) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	} catch (error) {
		throw new Error(500, 'upload error');
	}
};

const createStorage = dest => {
	return multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dest);
		},
		filename: (req, file, cb) => {
			const name = crypto.randomBytes(20).toString('hex');
			const ext = path.extname(file.originalname);
			cb(null, `${name}${ext}`);
		},
	});
};

const singleUpload = (storage, field) => {
	return multer({
		storage,
		fileFilter,
	}).single(field);
};

const multiUpload = (storage, field, limit) => {
	return multer({
		storage,
		fileFilter,
	}).array(field, limit);
};

const uploadAvatar = () => {
	const storage = createStorage(
		path.join(__dirname, '../assets/uploads/avatars')
	);
	return singleUpload(storage, 'avatar');
};

const uploadPhotos = limit => {
	const storage = createStorage(
		path.join(__dirname, '../assets/uploads/photos')
	);
	return multiUpload(storage, 'photos', limit);
};

module.exports = {
	uploadAvatar,
	uploadPhotos,
};

