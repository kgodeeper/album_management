const route = require('express').Router();
const userAlbumControl = require('./user-album.controller');
const { loginRequire } = require('../../utils/midleware.util');

route.post('/user-albums', loginRequire, userAlbumControl.addUserAlbum);

module.exports = {
	userAlbumRoute: route,
};

