const albumService = require('../src/modules/albums/album.service');
const { app } = require('../src/app');
const request = require('supertest');

jest.mock('../src/modules/albums/album.service');

afterAll(async () => {
	await app.close();
});

describe('POST /albums', () => {
	it('create album success', async () => {
		albumService.createAlbum.mockResolvedValue();
		const res = await request(app).post('/albums').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('album already exist', async () => {
		albumService.createAlbum.mockRejectedValue(
			new Error(500, 'Album already exist')
		);
		const res = await request(app).post('/albums').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});

	it('unable to create album', async () => {
		albumService.createAlbum.mockRejectedValue(
			new Error(500, 'Unable to create album')
		);
		const res = await request(app).post('/albums').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});

	it('check dont have token', async () => {
		albumService.createAlbum.mockResolvedValue();
		const res = await request(app).post('/albums');
		expect(res.status).toBe(401);
	});
});

describe('PUT /albums/:id', () => {
	it('update album success', async () => {
		albumService.updateAlbum.mockResolvedValue();
		const res = await request(app)
			.put('/albums/testalbum')
			.send({
				name: 'Test',
				description: 'Test',
				status: 1,
			})
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		expect(res.status).toBe(200);
	});

	it('update album fail', async () => {
		albumService.updateAlbum.mockRejectedValue(new Error(500, 'Error'));
		const res = await request(app)
			.put('/albums/testalbum')
			.send({
				name: 'Test',
				description: 'Test',
				status: 1,
			})
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		expect(res.status).toBe(500);
	});
});

describe('DELETE /albums/:id', () => {
	it('delete album success', async () => {
		albumService.deleteAlbum.mockResolvedValue();
		const res = await request(app).delete('/albums/testalbum').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('delete album fail', async () => {
		albumService.deleteAlbum.mockRejectedValue(new Error(500, 'Error'));
		const res = await request(app).delete('/albums/testalbum').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});
});

