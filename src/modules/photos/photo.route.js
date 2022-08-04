const route = require('express').Router();
const { loginRequire } = require('../../utils/midleware.util');
const photoControl = require('./photo.controller');

/**
 * @swagger
 * paths:
 *   /photos:
 *      get:
 *         security:
 *           - bearerAuth: []
 *         summary: get list photo
 *         tags:
 *           - Photos
 *         responses:
 *            200:
 *              description: ok
 *            500:
 *              description: error
 *            401:
 *              description: unauthornized
 *      post:
 *         security:
 *           - bearerAuth: []
 *         summary: upload photos
 *         tags:
 *           - Photos
 *         requestBody:
 *           content:
 *              multipart/form-data:
 *                 schema:
 *                   type: object
 *                   required:
 *                     - photos
 *                   properties:
 *                     photos:
 *                        type: array
 *                        items:
 *                          type: string
 *                          format: binary
 *                     albumId:
 *                        type: string
 *         responses:
 *            200:
 *              description: ok
 *            500:
 *              description: error
 *            401:
 *              description: unauthornized
 *   /photos/{id}:
 *      get:
 *         security:
 *           - bearerAuth: []
 *         summary: get photo
 *         tags:
 *           - Photos
 *         parameters:
 *           - name: id
 *             in: path
 *             required: true
 *             schema:
 *               type: string
 *         responses:
 *            200:
 *              description: ok
 *            500:
 *              description: error
 *            401:
 *              description: unauthornized
 *      put:
 *         security:
 *           - bearerAuth: []
 *         summary: update photos info
 *         tags:
 *           - Photos
 *         parameters:
 *           - name: id
 *             in: path
 *             required: true
 *             schema:
 *               type: string
 *         requestBody:
 *           content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                      name:
 *                        type: string
 *                      description:
 *                        type: string
 *         responses:
 *            200:
 *              description: ok
 *            500:
 *              description: error
 *            401:
 *              description: unauthornized
 *      delete:
 *         security:
 *           - bearerAuth: []
 *         summary: delete photo
 *         tags:
 *           - Photos
 *         parameters:
 *           - name: id
 *             in: path
 *             required: true
 *             schema:
 *               type: string
 *         responses:
 *            200:
 *              description: ok
 *            500:
 *              description: error
 *            401:
 *              description: unauthornized
 *   /replace/photos/{id}:
 *      patch:
 *         security:
 *           - bearerAuth: []
 *         summary: replace photo position
 *         tags:
 *           - Photos
 *         parameters:
 *           - name: id
 *             in: path
 *             required: true
 *             schema:
 *               type: string
 *         requestBody:
 *           content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                      albumId:
 *                         type: string
 *         responses:
 *            200:
 *              description: ok
 *            500:
 *              description: error
 *            401:
 *              description: unauthornized
 */

route.post('/photos', loginRequire, photoControl.addPhotos);

route.delete('/photos/:id', loginRequire, photoControl.deletePhoto);

route.put('/photos/:id', loginRequire, photoControl.updatePhoto);

route.patch('/replace/photos/:id', loginRequire, photoControl.replacePhoto);

route.get('/photos', loginRequire, photoControl.getListPhotos);

route.get('/photos/:id', loginRequire, photoControl.getPhoto);

module.exports = {
	photoRoute: route,
};

