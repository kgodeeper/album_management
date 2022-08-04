require('dotenv').config({ path: './src/configs/.env' });
const mongoose = require('mongoose');

mongoose
	.connect(process.env.URI)
	.then(data => {})
	.catch(error => {
		console.log(error);
	});

module.exports = { mongoose };

