const nodemailer = require('nodemailer');
var fs = require('fs')

const formatDate = (date) => {
    const filteredDate = new Date(date)

    return `${filteredDate.getUTCDate()}/${filteredDate.getUTCMonth()+1}/${filteredDate.getUTCFullYear()}`
}

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'alagatudo.contato@gmail.com', // generated ethereal user
        pass: 'senhadificil'// generated ethereal password
    }
});

const sendWarningMail = ({name, email, telephone, location, date, daysPredict}) => {
    console.log('Sending to', email)
    let mailOptions = {
        from: 'alagatudo.contato@gmail.com', // sender address
        to: email, // list of receivers
        subject: `Possível alagamento!`, // Subject line
		html: `Olá ${name}. O nosso sistema detectou uma alta possibilidade de alagamento na região ${location} na data ${formatDate(date)}!\nPor favor, tenha cuidado ao andar na rua. Atenciosamente, equipe Alaga Tudo`,
	}

    console.log('mailOptions', mailOptions)

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) return console.log(error);
	    console.log('Message sent: %s', info.messageId);
	});
}

module.exports = { sendWarningMail }