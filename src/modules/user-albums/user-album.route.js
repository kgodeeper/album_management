const route = require('express').Router();
const userAlbumControl = require('./user-album.controller');
const { loginRequire } = require('../../utils/midleware.util');

/**
 * @swagger
 * paths:
 *   /user-albums:
 *      post:
 *         security:
 *           - bearerAuth: []
 *         tags:
 *           - User Albums
 *         summary: add member to album
 *         description: API for add member to album
 *         requestBody:
 *           content:
 *              application/json:
 *                 schema:
 *                    type: object
 *                    required:
 *                      - albumId
 *                    properties:
 *                      albumId:
 *                         type: string
 *         responses:
 *            200:
 *               desciption: ok
 *            500:
 *               description: fail to add member
 *      get:
 *         security:
 *           - bearerAuth: []
 *         tags:
 *           - User Albums
 *         summary: get user's album
 *         description: API for get user's album
 *         responses:
 *            200:
 *               desciption: ok
 *            500:
 *               description: authentication fail
 *            401:
 *               description: unauthornized
 *   /members/{id}:
 *     get:
 *         security:
 *           - bearerAuth: []
 *         tags:
 *           - User Albums
 *         summary: get member of album
 *         description: API for get member of album
 *         parameters:
 *           - name: id
 *             in: path
 *             required: true
 *             schema:
 *               type: string
 *         responses:
 *            200:
 *               desciption: ok
 *            500:
 *               description: authentication fail
 *            401:
 *               description: unauthornized
 */

route.post('/user-albums', loginRequire, userAlbumControl.addUserAlbum);

route.get('/user-albums', loginRequire, userAlbumControl.getUserAlbums);

route.get('/members/:id', loginRequire, userAlbumControl.getMembers);

module.exports = {
	userAlbumRoute: route,
};

