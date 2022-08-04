const userService = require('../src/modules/users/user.service');
const mailService = require('../src/utils/mail.util');
const request = require('supertest');
const { Error } = require('../src/errors/error-handling');
const { app } = require('../src/app');

jest.mock('../src/modules/albums/album.service');
jest.mock('../src/modules/users/user.service');
jest.mock('../src/utils/mail.util');

afterAll(async () => {
	await app.close();
});

jest.setTimeout(20000);

describe('POST /login', () => {
	it('check login success', async () => {
		userService.checkUserExist.mockResolvedValue({
			isExist: true,
			isActive: true,
		});
		const response = await request(app).post('/login').send({
			account: 'abc',
			password: 'xyz',
		});
		expect(response.status).toBe(200);
		expect(response.body.accessToken).not.toBeNull();
	});

	it('check invalid username, password', async () => {
		userService.checkUserExist.mockResolvedValue({
			isExist: false,
			isActive: true,
		});
		const response = await request(app).post('/login').send({
			account: 'abc',
			password: 'xyz',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe("user isn't exist");
	});

	it('check user inactive', async () => {
		userService.checkUserExist.mockResolvedValue({
			isExist: true,
			isActive: false,
		});
		const response = await request(app).post('/login').send({
			account: 'abc',
			password: 'xyz',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe("user isn't active");
	});

	it('check not have account', async () => {
		const response = await request(app).post('/login').send({
			password: 'xyz',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('"account" is required');
	});

	it('check not have password', async () => {
		const response = await request(app).post('/login').send({
			account: 'xyz',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('"password" is required');
	});

	it('check server error', async () => {
		userService.checkUserExist.mockRejectedValue({
			errorCode: 500,
			error: 'server error',
		});
		const response = await request(app).post('/login').send({
			account: 'abc',
			password: 'xyz',
		});
		expect(response.status).toBe(500);
	});
});

describe('POST /register:', () => {
	it('check username not valid (only contains number or letter, at least 6 charactor):', async () => {
		const response = await request(app).post('/register').send({
			username: 'k11',
			password: 'kdev1711/',
			email: 'kdev11@gmail.com',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe(
			'"username" with value "k11" fails to match the required pattern: /^[a-zA-Z][a-zA-Z0-9@]{5,}/'
		);
	});

	it('check password not valid (at least 1 letter, 1 special charactor, 1 number, at least 8 charactor):', async () => {
		const response = await request(app).post('/register').send({
			username: 'kdev1711',
			password: 'kdev1711a',
			email: 'kdev11@gmail.com',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe(
			'"password" with value "kdev1711a" fails to match the required pattern: /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*#?&/])[a-zA-Z0-9@$!%*#?&/]{8,}$/'
		);
	});

	it('check email not valid:', async () => {
		const response = await request(app).post('/register').send({
			username: 'kdev1711',
			password: 'kdev1711a/',
			email: 'kdev11@gmail',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('"email" must be a valid email');
	});

	it('check not have email (is valid email):', async () => {
		const response = await request(app).post('/register').send({
			username: 'kdev1711',
			password: 'kdev1711a/',
			rePassword: 'kdev1711a/',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('"email" is required');
	});

	it('check not have username:', async () => {
		const response = await request(app).post('/register').send({
			password: 'kdev1711a/',
			rePassword: 'kdev1711a/',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('"username" is required');
	});

	it('check not have password:', async () => {
		const response = await request(app).post('/register').send({
			username: 'kdev1711',
			rePassword: 'kdev1711a/',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('"password" is required');
	});

	it('check register success:', async () => {
		userService.userRegister.mockResolvedValue();
		mailService.sendVerifyMail.mockResolvedValue();
		const response = await request(app).post('/register').send({
			username: 'kdev17',
			password: 'kdev1711/',
			rePassword: 'kdev1711/',
			email: 'kdev17@gmail.com',
		});
		expect(response.status).toBe(200);
		expect(response.body.isRegister).toBe(true);
	});

	it('check account already exist', async () => {
		userService.userRegister.mockRejectedValue(
			new Error(500, 'user already exist')
		);
		const response = await request(app).post('/register').send({
			username: 'kdev17',
			password: 'kdev1711/',
			rePassword: 'kdev1711/',
			email: 'kdev17@gmail.com',
		});
		expect(response.status).toBe(500);
		expect(response.body.details).toBe('user already exist');
	});
});

