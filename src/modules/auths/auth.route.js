const route = require('express').Router();
const authControl = require('./auth.controller.js');
const { validateLogin, validateRegis } = require('./auth.validation');

/**
 * @swagger
 * description: Authentication
 * paths:
 *  /login:
 *     post:
 *       summary: login
 *       tags:
 *         - Authentications
 *       description: API for login user will return an accessToken if success
 *       requestBody:
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 required:
 *                   - account
 *                   - password
 *                 properties:
 *                   account:
 *                     type: string
 *                   password:
 *                     type: string
 *       responses:
 *         200:
 *           description: ok
 *         500:
 *           description: Wrong username or password, user inactive, server error
 *  /register:
 *     post:
 *       tags:
 *         - Authentications
 *       summary: register
 *       description: API for register a new account
 *       requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                    - username
 *                    - password
 *                    - rePassword
 *                    - email
 *                 properties:
 *                    username:
 *                       type: string
 *                    password:
 *                       type: string
 *                    rePassword:
 *                       type: string
 *                    email:
 *                       type: string
 *       responses:
 *            200:
 *              description: register ok
 *            500:
 *              description: information error, register error
 *
 */

route.post('/login', validateLogin, authControl.userLogin);

route.post('/register', validateRegis, authControl.userRegister);

module.exports = {
	authRoute: route,
};

