const nodemailer = require('nodemailer');
var fs = require('fs')

const { numberToString } = require('../utils');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'alagatudo.contato@gmail.com', // generated ethereal user
        pass: 'senhadificil'// generated ethereal password
    }
});

const sendWarningMail = (body) => {

    let mailOptions = {
        from: 'alagatudo.contato@gmail.com', // sender address
        to: body.email, // list of receivers
        subject: `ENCHENTE HOJE`, // Subject line
		html: 'Cuidado. A regiao monitorada por você tem alta probabilidade de sofrer uma enchente hoje!', 
	}

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) return console.log(error);
	    console.log('Message sent: %s', info.messageId);
	});
}

module.exports = { sendWarningMail }