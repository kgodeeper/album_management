require('dotenv').config({ path: './src/configs/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT || 2000, () => {
	console.log(`server is running on port ${process.env.PORT}`);
});

console.log('Hello');

