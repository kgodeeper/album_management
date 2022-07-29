require('dotenv').config({ path: './src/configs/.env' });
const { connect } = require('../src/utils/connect');

describe('Test connection', () => {
	test('Connect with exact uri', async () => {
		const status = await connect(process.env.URI);
		expect(status).toBeUndefined();
	});

	test('Connect with fail uri', async () => {
		const status = await connect('https://failurl.vn');
		expect(status).not.toBeUndefined();
	});
});

