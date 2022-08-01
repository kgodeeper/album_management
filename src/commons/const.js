const { Error } = require('./error-handling');

const databaseError = new Error(500, `Unable connect to database`);

module.exports = {
	databaseError,
};

