const { uploadPhotos } = require('../../utils/upload.util');
const { decode } = require('../../utils/jwt.util');
const photoService = require('./photo.service');

const addPhotos = async (req, res, next) => {
	const upload = uploadPhotos(5);
	await upload(req, res, async error => {
		if (!error) {
			const token = req.get('Authorization').split(' ')[1];
			const payload = decode(token);
			req.body.account = payload.account;
			try {
				await photoService.addPhotos({
					files: req.files,
					infos: req.body,
				});
				res.sendStatus(200);
			} catch (error) {
				next(error);
			}
		} else {
			next(new Error(500, 'fail to upload'));
		}
	});
};

const deletePhoto = async (req, res, next) => {
	try {
		req.body.photoId = req.params.id;
		await photoService.deletePhoto(req.body);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};

const updatePhoto = async (req, res, next) => {
	try {
		req.body.photoId = req.params.id;
		await photoService.updatePhoto(req.body);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};

const replacePhoto = async (req, res, next) => {
	try {
		req.body.photoId = req.params.id;
		await photoService.replacePhoto(req.body);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	addPhotos,
	deletePhoto,
	updatePhoto,
	replacePhoto,
};

