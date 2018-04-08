const Nexmo = require('nexmo');

const formatDate = (date) => {
    const filteredDate = new Date(date)

    return `${filteredDate.getUTCDate()}/${filteredDate.getUTCMonth()+1}/${filteredDate.getUTCFullYear()}`
}


function sendSms (body) {
    const {name, email, telephone, location, date, daysPredict} = body;
    var content = `Olá ${name}. O nosso sistema detectou uma alta possibilidade de alagamento na região ${location} na data ${formatDate(date)}!\nPor favor, tenha cuidado ao andar na rua. Atenciosamente, equipe Alaga Tudo`;
    
    const nexmo = new Nexmo({
      apiKey: '44daecf8',
      apiSecret: '6U5qsbqgTyYUzryE'
    });

    nexmo.message.sendSms(
      'NEXXMO', '5514998134104', content,
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            console.dir(responseData);
          }
        }
    );
}

module.exports = { sendSms }