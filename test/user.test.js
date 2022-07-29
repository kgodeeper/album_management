const { userModel } = require('../src/modules/users/user.model');
const userRepo = require('../src/modules/users/user.repository');

beforeAll(async () => {
	await userModel.insertMany([
		{
			username: 'tester01',
			password: '5eafc388b624dfdf315cda51f475894bb85176f16850a99260182bb368628a08',
			email: 'fake1@gmail.com',
			isActive: true,
		},
		{
			username: 'tester02',
			password: '5eafc388b624dfdf315cda51f475894bb85176f16850a99260182bb368628a08',
			email: 'fake2@gmail.com',
			isActive: false,
		},
	]);
});

afterAll(async () => {
	await userModel.remove({ $or: [{ username: 'tester01' }, { username: 'tester02' }] });
});

describe('user repository test', () => {
	test('user exist and active', async () => {
		await expect(
			userRepo.checkUserExist('tester01', '5eafc388b624dfdf315cda51f475894bb85176f16850a99260182bb368628a08')
		).resolves.toEqual({
			isExist: true,
			isActive: true,
			error: null,
		});
	});

	test('user exist but iactive', async () => {
		await expect(
			userRepo.checkUserExist('tester02', '5eafc388b624dfdf315cda51f475894bb85176f16850a99260182bb368628a08')
		).resolves.toEqual({
			isExist: true,
			isActive: false,
			error: null,
		});
	});

	test('user does not exist', async () => {
		await expect(
			userRepo.checkUserExist('tester03', '5eafc388b624dfdf315cda51f475894bb85176f16850a99260182bb368628a08')
		).resolves.toEqual({
			isExist: false,
			isActive: false,
			error: null,
		});
	});

	test('function will be error if find error', async () => {
		const checkStatus = await userRepo.checkUserExist('tester03', {});
		expect(checkStatus.error).not.toBeNull();
	});
});

