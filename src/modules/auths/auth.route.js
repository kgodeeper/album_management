const route = require('express').Router();
a;
route.get('/login', (req, res) => {
	res.send('login require');
});

module.exports = {
	auth: route,
};

