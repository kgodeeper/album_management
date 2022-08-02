require('dotenv').config({ path: './src/configs/.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { authRoute } = require('./modules/auths/auth.route');
const { userRoute } = require('./modules/users/user.route');
const { albumRoute } = require('./modules/albums/album.route');
const { userAlbumRoute } = require('./modules/user-albums/user-album.route');
const { photoRoute } = require('./modules/photos/photo.route');

// create server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(authRoute);
app.use(userRoute);
app.use(albumRoute);
app.use(photoRoute);
app.use(userAlbumRoute);

// error handling middleware
app.use((err, req, res, next) => {
	res.status(err.errorCode).json({ details: err.errorMessage });
});

app.listen(process.env.PORT, () => {
	console.log(`server is running on port ${process.env.PORT}`);
});

