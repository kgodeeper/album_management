require('dotenv').config({ path: './src/configs/.env' });
const { Error } = require('../errors/error-handling');
const nodemailer = require('nodemailer');

const transporterConfig = {
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
};

const transporter = nodemailer.createTransport(transporterConfig);

const createMessage = (destination, subject, content) => {
	return {
		from: 'album manager group',
		to: destination,
		subject,
		html: `<html><h3>${content}</h3></html>`,
	};
};

const sendMail = message => {
	transporter.sendMail(message, error => {
		if (error) {
			console.log(error);
		}
	});
};

const sendVerifyMail = (email, code) => {
	const message = createMessage(
		email,
		'Verify your email',
		`<h3>Your activation code: ${
			code % 100000
		}</h3><p>This code will be expires in 2 minutes</p>`
	);
	sendMail(message);
};

const generateCode = () => {
	const date = new Date();
	date.setMinutes(date.getMinutes() + 2);
	return Number(date);
};

module.exports = {
	createMessage,
	sendMail,
	sendVerifyMail,
	generateCode,
};

