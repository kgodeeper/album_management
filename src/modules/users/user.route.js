const route = require('express').Router();
const { loginRequire } = require('../../utils/midleware.util');
const { uploadAvatar } = require('../../utils/upload.util');
const userControl = require('./user.controller');
const validation = require('./user.validation');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * paths:
 *   /active-user:
 *      patch:
 *        summary: active user using activation code and email
 *        description: API for active user's account
 *        tags:
 *          - Users
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                   - activationCode
 *                   - email
 *                 properties:
 *                   activationCode:
 *                     type: string
 *                   email:
 *                     type: string
 *        responses:
 *          200:
 *             description: ok
 *          500:
 *             description: server error, activate fail, email not valid
 *   /resend-code:
 *       patch:
 *         tags:
 *           - Users
 *         summary: require resend activation code if activation code is expires
 *         description: API for resend activation code
 *         requestBody:
 *            content:
 *               application/json:
 *                    schema:
 *                       type: object
 *                       required:
 *                         - email
 *                       properties:
 *                         email:
 *                           type: string
 *         responses:
 *             200:
 *               description: ok
 *             500:
 *               description: email not valid or send email error
 *   /forgot-password:
 *       patch:
 *         tags:
 *           - Users
 *         summary: change password by temp token
 *         description: API for change password
 *         requestBody:
 *            content:
 *               application/json:
 *                    schema:
 *                       type: object
 *                       required:
 *                         - token
 *                         - password
 *                         - rePassword
 *                       properties:
 *                         token:
 *                           type: string
 *                         password:
 *                           type: string
 *                         rePassword:
 *                           type: string
 *         responses:
 *             200:
 *               description: ok
 *             500:
 *               description: password, repassword, or token not valid
 *   /change-password:
 *       patch:
 *         security:
 *           - bearerAuth: []
 *         tags:
 *           - Users
 *         summary: change password when authentication done
 *         description: API for change password
 *         requestBody:
 *            content:
 *               application/json:
 *                    schema:
 *                       type: object
 *                       required:
 *                         - password
 *                         - rePassword
 *                       properties:
 *                         password:
 *                           type: string
 *                         rePassword:
 *                           type: string
 *         responses:
 *             200:
 *               description: ok
 *             500:
 *               description: password, repassword, or token not valid
 *   /verify-email:
 *       post:
 *         tags:
 *           - Users
 *         summary: verify the email
 *         description: API for verify email and return an token for forgot password
 *         requestBody:
 *            content:
 *               application/json:
 *                    schema:
 *                       type: object
 *                       required:
 *                         - verifyCode
 *                         - email
 *                       properties:
 *                         verifyCode:
 *                           type: string
 *                         email:
 *                           type: string
 *         responses:
 *             200:
 *               description: ok
 *             500:
 *               description: fail
 *   /users:
 *       patch:
 *         security:
 *           - bearerAuth: []
 *         tags:
 *           - Users
 *         summary: update user information
 *         description: API for update user information
 *         requestBody:
 *            content:
 *               multipart/form-data:
 *                    schema:
 *                       type: object
 *                       properties:
 *                         fullname:
 *                           type: string
 *                         address:
 *                           type: string
 *                         dob:
 *                           type: string
 *                         gender:
 *                           type: boolean
 *                         phone:
 *                           type: string
 *                         avatar:
 *                           type: string
 *                           format: binary
 *         responses:
 *             200:
 *               description: ok
 *             500:
 *               description: password, repassword, or token not valid
 */

route.patch(
	'/active-user',
	validation.validateActiveCode,
	userControl.activeUser
);

route.patch('/resend-code', userControl.resendCode);

route.patch(
	'/forgot-password',
	validation.validationChangePass,
	userControl.changePasswordByToken
);

route.patch(
	'/change-password',
	loginRequire,
	validation.validationChangePass,
	userControl.changePasswordByToken
);

route.post('/verify-email', userControl.verifyEmail);

route.patch('/users', loginRequire, userControl.updateUser);

module.exports = { userRoute: route };

