const route = require('express').Router();
const albumControl = require('./album.controller');
const { loginRequire } = require('../../utils/midleware.util');

route.post('/create-album', loginRequire, async (req, res, next) => {
	try {
		await albumControl.createAlbum(req, res);
	} catch (error) {
		next(error);
	}
});

route.put('/update-album', loginRequire, async (req, res, next) => {
	try {
		await albumControl.updateAlbum(req, res);
	} catch (error) {
		next(error);
	}
});
module.exports = {
	albumRoute: route,
};

