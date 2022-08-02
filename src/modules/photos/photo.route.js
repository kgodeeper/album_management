const route = require('express').Router();
const { loginRequire } = require('../../utils/midleware.util');
const photoControl = require('./photo.controller');

route.post('/photos', loginRequire, photoControl.addPhotos);

route.delete('/photos/:id', loginRequire, photoControl.deletePhoto);

route.put('/photos/:id', loginRequire, photoControl.updatePhoto);

route.patch('/replace/photos/:id', loginRequire, photoControl.replacePhoto);

route.get('/photos', loginRequire, photoControl.getListPhotos);

route.get('/photos/:id', loginRequire, photoControl.getPhoto);

module.exports = {
	photoRoute: route,
};

