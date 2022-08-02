const route = require('express').Router();
const photoControl = require('./photo.controller');

route.post('/photos', photoControl.addPhotos);

module.exports = {
	photoRoute: route,
};

