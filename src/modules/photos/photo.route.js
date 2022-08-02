const route = require('express').Router();
const { loginRequire } = require('../../utils/midleware.util');
const photoControl = require('./photo.controller');

route.post('/photos', loginRequire, photoControl.addPhotos);

route.delete('/photos/:id', loginRequire, photoControl.deletePhoto);

module.exports = {
	photoRoute: route,
};

