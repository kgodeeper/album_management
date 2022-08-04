const userAlbumService = require('../src/modules/user-albums/user-album.service');
const { app } = require('../src/app');
const request = require('supertest');

jest.mock('../src/modules/user-albums/user-album.service');

afterAll(async () => {
	await app.close();
});

describe('POST /user-albums', () => {
	it('create user albums success', async () => {
		userAlbumService.addUserAlbum.mockResolvedValue();
		const res = await request(app).post('/user-albums').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('user-albums already exist', async () => {
		userAlbumService.addUserAlbum.mockRejectedValue(
			new Error(500, 'Album already exist')
		);
		const res = await request(app).post('/user-albums').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});

	it('unable to add user album', async () => {
		userAlbumService.addUserAlbum.mockRejectedValue(
			new Error(500, 'Unable to create album')
		);
		const res = await request(app).post('/user-albums').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});

	it('check dont have token', async () => {
		userAlbumService.addUserAlbum.mockResolvedValue();
		const res = await request(app).post('/user-albums');
		expect(res.status).toBe(401);
	});
});

describe('GET /user-albums', () => {
	it('get user album success', async () => {
		userAlbumService.getUserAlbums.mockResolvedValue();
		const res = await request(app).get('/user-albums').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('get user album fail', async () => {
		userAlbumService.getUserAlbums.mockRejectedValue(
			new Error(500, 'Error')
		);
		const res = await request(app).get('/user-albums').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});
});

describe('GET /members/:id', () => {
	it('get menbers success', async () => {
		userAlbumService.getMembers.mockResolvedValue();
		const res = await request(app).get('/members/testalbum').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('get members fail', async () => {
		userAlbumService.getMembers.mockRejectedValue(new Error(500, 'Error'));
		const res = await request(app).get('/members/testalbum').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});
});

