const route = require('express').Router();
const userAlbumControl = require('./user-album.controller');
const { loginRequire } = require('../../utils/midleware.util');

route.post('/user-albums', loginRequire, userAlbumControl.addUserAlbum);

route.get('/user-albums', loginRequire, userAlbumControl.getUserAlbums);

route.get('/members/:id', loginRequire, userAlbumControl.getMembers);

module.exports = {
	userAlbumRoute: route,
};

