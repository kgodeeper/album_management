const photoService = require('../src/modules/photos/photo.service');
const { app } = require('../src/app');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const upload = require('../src/utils/upload.util');
const request = require('supertest');

jest.mock('../src/modules/photos/photo.service');
jest.mock('../src/utils/upload.util');

afterAll(async () => {
	await app.close();
});

describe('POST /photos', () => {
	it('upload photo success', async () => {
		const fakeStorage = multer.diskStorage({
			destination: (req, file, cb) => {
				return cb(null, 'src/assets/uploads/tests');
			},
			filename: (req, file, cb) => {
				return cb(null, 'test.jpeg');
			},
		});
		const fakeUpload = multer({ storage: fakeStorage }).array('photos');
		upload.uploadPhotos.mockReturnValue(fakeUpload);
		const response = await request(app)
			.post('/photos')
			.type('multipart/form-data')
			.attach(
				'photos',
				path.join(
					__dirname,
					'../src/assets/uploads/avatars/1659365249888.jpeg'
				)
			)
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		await fs.unlinkSync(
			path.join(__dirname, '../src/assets/uploads/tests/test.jpeg')
		);
		expect(response.status).toBe(200);
		photoService.addPhotos.mockResolvedValue();
	});

	it('upload photo fail', async () => {
		const fakeStorage = multer.diskStorage({
			destination: (req, file, cb) => {
				return cb(null, 'src/assets/uploads/tests');
			},
			filename: (req, file, cb) => {
				return cb(null, 'test.jpeg');
			},
		});
		const fakeUpload = multer({ storage: fakeStorage }).array('photos');
		upload.uploadPhotos.mockReturnValue(fakeUpload);
		photoService.addPhotos.mockRejectedValue();
		const response = await request(app)
			.post('/photos')
			.type('multipart/form-data')
			.attach(
				'photos',
				path.join(
					__dirname,
					'../src/assets/uploads/avatars/1659365249888.jpeg'
				)
			)
			.set({
				Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
			});
		await fs.unlinkSync(
			path.join(__dirname, '../src/assets/uploads/tests/test.jpeg')
		);
		expect(response.status).toBe(500);
	});
});

describe('DELETE /photos/:id', () => {
	it('delete photo success', async () => {
		photoService.deletePhoto.mockResolvedValue();
		const res = await request(app).delete('/photos/testphoto').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('unable to delete photo', async () => {
		photoService.deletePhoto.mockRejectedValue(
			new Error(500, 'Unable to delete photo')
		);
		const res = await request(app).delete('/photos/testphoto').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});

	it('check dont have token', async () => {
		const res = await request(app).post('/photos/testphoto');
		expect(res.status).toBe(404);
	});
});

describe('PUT /photos/:id', () => {
	it('update photo success', async () => {
		photoService.updatePhoto.mockResolvedValue();
		const res = await request(app).put('/photos/testphoto').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('update photo fail', async () => {
		photoService.updatePhoto.mockRejectedValue(
			new Error(500, 'Unable to update photo')
		);
		const res = await request(app).put('/photos/testphoto').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});
});

describe('PATCH /replace/photo/:id', () => {
	it('replace photo success', async () => {
		photoService.replacePhoto.mockResolvedValue();
		const res = await request(app).patch('/replace/photos/testphoto').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('replace photot fail', async () => {
		photoService.replacePhoto.mockRejectedValue(new Error(500, 'Error'));
		const res = await request(app).patch('/replace/photos/testphoto').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});
});

describe('GET /photos', () => {
	it('get list photo success', async () => {
		photoService.getListPhotos.mockResolvedValue();
		const res = await request(app).get('/photos').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(200);
	});

	it('get list photo fail', async () => {
		photoService.getListPhotos.mockRejectedValue(new Error(500, 'Error'));
		const res = await request(app).get('/photos').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});
});

describe('GET /photos/:id', () => {
	it('get photo success', async () => {
		photoService.getPhoto.mockResolvedValue('filepath');
		const res = await request(app).get('/photos/testphoto').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});

	it('get photo fail', async () => {
		photoService.getPhoto.mockRejectedValue(new Error(500, 'Error'));
		const res = await request(app).get('/photos/testphoto').set({
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA`,
		});
		expect(res.status).toBe(500);
	});
});

