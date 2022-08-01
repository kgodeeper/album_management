const multer = require('multer');
const path = require('path');
const { Error } = require('../commons/error-handling');
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
		throw new Error(200, 'upload error');
	}
};

const createStorage = dest => {
	return multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, dest);
		},
		filename: (req, file, cb) => {
			const name = Number(new Date());
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

const uploadAvatar = () => {
	const storage = createStorage(
		path.join(__dirname, '../assets/uploads/avatars')
	);
	return multer({
		storage,
		fileFilter,
	}).single('avatar');
};

module.exports = {
	createStorage,
	singleUpload,
	uploadAvatar,
};

