const route = require('express').Router();
const albumControl = require('./album.controller');
const { loginRequire } = require('../../utils/midleware.util');

route.post('/albums', loginRequire, albumControl.createAlbum);

route.put('/albums/:id', loginRequire, albumControl.updateAlbum);

route.delete('/albums/:id', loginRequire, albumControl.deleteAlbum);

module.exports = {
	albumRoute: route,
};

