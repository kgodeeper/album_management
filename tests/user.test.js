const request = require('supertest');
const userService = require('../src/modules/users/user.service');
const path = require('path');
const multer = require('multer');
const upload = require('../src/utils/upload.util');
const { Error } = require('../src/errors/error-handling');
const { app } = require('../src/app');

afterAll(async () => {
	await app.close();
});

jest.mock('../src/modules/users/user.service');
jest.mock('../src/utils/upload.util');

describe('PATCH /active-user', () => {
	it('check activationCode not valid', async () => {
		const response = await request(app).patch('/active-user').send({
			activationCode: 'abc',
			email: 'kdev11@gmail.com',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe(
			'"activationCode" with value "abc" fails to match the required pattern: /[0-9]{5}/'
		);
	});

	it('check dont have activationCode', async () => {
		const response = await request(app).patch('/active-user').send({
			email: 'kdev11@gmail.com',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('"activationCode" is required');
	});

	it('check email note valid', async () => {
		const response = await request(app).patch('/active-user').send({
			activationCode: '11223',
			email: 'kdev11@gmail',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('"email" must be a valid email');
	});

	it('check active user success', async () => {
		userService.activeUser.mockResolvedValue(true);
		const response = await request(app).patch('/active-user').send({
			activationCode: '11223',
			email: 'kdev11@gmail.com',
		});
		expect(response.status).toBe(200);
		expect(response.body.isActive).toBe(true);
	});

	it('check active user fail: ', async () => {
		userService.activeUser.mockResolvedValue(false);
		const response = await request(app).patch('/active-user').send({
			activationCode: '11223',
			email: 'kdev11@gmail.com',
		});
		expect(response.status).toBe(200);
		expect(response.body.isActive).toBe(false);
	});

	it('check server error: ', async () => {
		userService.activeUser.mockRejectedValue(new Error(500, ''));
		const response = await request(app).patch('/active-user').send({
			activationCode: '11223',
			email: 'kdev11@gmail.com',
		});
		expect(response.status).toBe(500);
	});
});

describe('PATCH /resend-code', () => {
	it('check can not find user', async () => {
		userService.resendCode.mockRejectedValue(
			new Error(500, 'unable to find user')
		);
		const response = await request(app).patch('/resend-code').send({});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('unable to find user');
	});

	it('check fail to resend code', async () => {
		userService.resendCode.mockRejectedValue(
			new Error(500, 'fail to resend code')
		);
		const response = await request(app).patch('/resend-code').send({});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('fail to resend code');
	});

	it('check resend code success', async () => {
		userService.resendCode.mockResolvedValue(true);
		const response = await request(app).patch('/resend-code').send({
			email: 'kdev17@gmail.com',
		});
		expect(response.status).toBe(200);
	});
});

describe('PATCH /forgot-password', () => {
	it('check fail to find user', async () => {
		userService.changePasswordByToken.mockRejectedValue(
			new Error(500, "Can't find user")
		);
		const response = await request(app).patch('/forgot-password').send({
			password: 'newpassword1/',
			rePassword: 'newpassword1/',
		});
		expect(response.status).toBe(500);
	});

	it('check fail to change password', async () => {
		userService.changePasswordByToken.mockRejectedValue(
			new Error(500, 'Fail to change password')
		);
		const response = await request(app).patch('/forgot-password').send({
			password: 'newpassword1/',
			rePassword: 'newpassword1/',
		});
		expect(response.status).toBe(500);
	});

	it('change password success', async () => {
		userService.changePasswordByToken.mockResolvedValue(true);
		const response = await request(app).patch('/forgot-password').send({
			password: 'newpassword1/',
			rePassword: 'newpassword1/',
		});
		expect(response.status).toBe(200);
	});

	it('check password not valid', async () => {
		const response = await request(app).patch('/forgot-password').send({
			password: 'newpassaa/',
			rePassword: 'newpassaa/',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe(
			'"password" with value "newpassaa/" fails to match the required pattern: /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&/])[a-zA-Z0-9@$!%*#?&/]{8,}$/'
		);
	});
});

describe('PATCH /change-password', () => {
	it('check fail to find user', async () => {
		userService.changePasswordByToken.mockRejectedValue(
			new Error(500, "Can't find user")
		);
		const response = await request(app)
			.patch('/change-password')
			.send({
				password: 'newpassword1/',
				rePassword: 'newpassword1/',
			})
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		expect(response.status).toBe(500);
	});

	it('check fail to change password', async () => {
		userService.changePasswordByToken.mockRejectedValue(
			new Error(500, 'Fail to change password')
		);
		const response = await request(app)
			.patch('/change-password')
			.send({
				password: 'newpassword1/',
				rePassword: 'newpassword1/',
			})
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		expect(response.status).toBe(500);
	});

	it('change password success', async () => {
		userService.changePasswordByToken.mockResolvedValue(true);
		const response = await request(app)
			.patch('/change-password')
			.send({
				password: 'newpassword1/',
				rePassword: 'newpassword1/',
			})
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		expect(response.status).toBe(200);
	});

	it('check password not valid', async () => {
		const response = await request(app)
			.patch('/change-password')
			.send({
				password: 'newpassaa/',
				rePassword: 'newpassaa/',
			})
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe(
			'"password" with value "newpassaa/" fails to match the required pattern: /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&/])[a-zA-Z0-9@$!%*#?&/]{8,}$/'
		);
	});
});

describe('POST /verify-email', () => {
	it('Email not exist', async () => {
		userService.verifyEmail.mockRejectedValue(
			new Error(500, 'Cant find email')
		);
		const response = await request(app).post('/verify-email').send({
			email: 'itpt1711@gmail.com',
			verifyCode: '11012',
		});
		expect(response.body.details).toBe('Cant find email');
	});
	it('Veify email fail', async () => {
		userService.verifyEmail.mockRejectedValue(
			new Error(500, 'Cant verify email')
		);
		const response = await request(app).post('/verify-email').send({
			email: 'itpt1711@gmail.com',
			verifyCode: '11012',
		});
		expect(response.body.details).toBe('Cant verify email');
	});
	it('Veify email success', async () => {
		userService.verifyEmail.mockResolvedValue();
		const response = await request(app).post('/verify-email').send({
			email: 'itpt1711@gmail.com',
			verifyCode: '11012',
		});
		expect(response.status).toBe(200);
	});
});

describe('PATCH /users', () => {
	it('change user infor success', async () => {
		const fakeUpload = multer({ dest: 'src/assets/uploads/tests' }).single(
			'avatar'
		);
		upload.uploadAvatar.mockReturnValue(fakeUpload);
		userService.updateUser.mockResolvedValue();
		const response = await request(app)
			.patch('/users')
			.type('multipart/form-data')
			.attach(
				'avatar',
				path.join(
					__dirname,
					'../src/assets/uploads/avatars/1659365249888.jpeg'
				)
			)
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		expect(response.status).toBe(200);
	});
});

