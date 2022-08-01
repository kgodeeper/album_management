require('dotenv').config({ path: './src/configs/.env' });
const mongoose = require('mongoose');

const connect = async uri => {
	return await mongoose.connect(uri);
};

connect(process.env.URI)
	.then()
	.catch(error => {
		console.log(`${error}`);
	});

module.exports = { mongoose };

