const route = require('express').Router();
const albumControl = require('./album.controller');
const { loginRequire } = require('../../utils/midleware.util');

/**
 * @swagger
 * paths:
 *   /albums:
 *      post:
 *        security:
 *         - bearerAuth: []
 *        summary: create album
 *        description: api for create an album
 *        tags:
 *         - Albums
 *        requestBody:
 *           content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                     - name
 *                     - description
 *                     - status
 *                   properties:
 *                     name:
 *                        type: string
 *                     description:
 *                        type: string
 *                     status:
 *                        type: number
 *        responses:
 *             200:
 *               description: create ok
 *             500:
 *               description: create fail
 *             401:
 *               description: unauthornized
 *   /albums/{id}:
 *      put:
 *        security:
 *         - bearerAuth: []
 *        summary: update album
 *        description: API for update album info
 *        tags:
 *          - Albums
 *        parameters:
 *          - name: id
 *            required: true
 *            in: path
 *            schema:
 *               type: string
 *        requestBody:
 *           content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                     - name
 *                     - description
 *                     - status
 *                   properties:
 *                     name:
 *                        type: string
 *                     description:
 *                        type: string
 *                     status:
 *                        type: number
 *        responses:
 *             200:
 *               description: change album ok
 *             500:
 *               description: change album fail
 *             401:
 *               description: unauthornized
 *      delete:
 *        security:
 *         - bearerAuth: []
 *        summary: delete album
 *        description: API for upload album info
 *        tags:
 *          - Albums
 *        parameters:
 *          - name: id
 *            required: true
 *            in: path
 *            schema:
 *               type: string
 *        responses:
 *             200:
 *               description: create ok
 *             500:
 *               description: create fail
 *             401:
 *               description: unauthornized
 */

route.post('/albums', loginRequire, albumControl.createAlbum);

route.put('/albums/:id', loginRequire, albumControl.updateAlbum);

route.delete('/albums/:id', loginRequire, albumControl.deleteAlbum);

module.exports = {
	albumRoute: route,
};

