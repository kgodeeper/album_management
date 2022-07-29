const authService = require('../src/modules/auths/auth.service');
const authControl = require('../src/modules/auths/auth.controller');
const authRoute = require('../src/modules/auths/auth.route');
const request = require('supertest');
const BASEURL = 'http//localhost:2000';

describe('auth service test', () => {
	test('user exist and active', async () => {
		const isExist = await authService.userLogin('tester01', '17112000');
		expect(isExist.isExist).toBe(true);
		expect(isExist.isLogin).toBe(true);
		expect(isExist.accessToken).not.toBeNull();
		expect(isExist.error).toBeNull();
	});

	test('user exist but inactive', async () => {
		const isExist = await authService.userLogin('tester02', '17112000');
		expect(isExist.isLogin).toBe(false);
		expect(isExist.isExist).toBe(true);
		expect(isExist.accessToken).toBeNull();
		expect(isExist.error).toBeNull();
	});

	test('user does not exist', async () => {
		const isExist = await authService.userLogin('tester02', '12345678');
		expect(isExist.isExist).toBe(false);
		expect(isExist.isLogin).toBe(false);
		expect(isExist.accessToken).toBeNull();
		expect(isExist.error).toBeNull();
	});

	test('function will be error if password error', async () => {
		const isExist = await authService.userLogin('tester03');
		expect(isExist.error).not.toBeNull();
	});

	test('function will be error if username error', async () => {
		const isExist = await authService.userLogin({}, '12345678');
		expect(isExist.error).not.toBeNull();
	});
});

describe('auth route test', () => {
	test('user exist and active', async () => {});
});

