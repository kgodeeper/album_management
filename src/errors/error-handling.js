class ErrorHandling extends Error {
	errorCode;
	errorMessage;
	constructor(errorCode, errorMessage) {
		super();
		this.errorCode = errorCode;
		this.errorMessage = errorMessage;
	}
}

module.exports = { Error: ErrorHandling };

