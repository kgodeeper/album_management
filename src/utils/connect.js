require('dotenv').config({ path: './src/configs/.env' });
const mongoose = require('mongoose');
c;

function connect() {
	mongoose.connect(process.env.URI).catch(error => {
		console.log(`Connect Error: ${error}`);
	});
}

connect();

module.exports = { mongoose };

