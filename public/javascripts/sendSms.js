export default function sendSms (body) {
    const Nexmo = require('nexmo');
    const nexmo = new Nexmo({
      apiKey: '44daecf8',
      apiSecret: '6U5qsbqgTyYUzryE'
    });

    const {name, email, telephone, location, date, daysPredict} = body;

    const content = `Olá ${name}. O nosso sistema detectou uma alta possibilidade de alagamento na região ${location} na data ${formatDate(date)}!\nPor favor, tenha cuidado ao andar na rua. Atenciosamente, equipe Alaga Tudo`,

    nexmo.message.sendSms(
      'NEXXMO', '14998134104', content,
        (err, responseData) => {
          if (err) {
            console.log(err);
          } else {
            console.dir(responseData);
          }
        }
    );
}
