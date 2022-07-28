const route = require('express').Router();
const { auth } = require('./src/modules/auths/auth.route');

route.use(auth);

module.exports = {
	route,
};

