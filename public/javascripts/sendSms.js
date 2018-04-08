function sendSms (to, content) {
    const Nexmo = require('nexmo');
    const nexmo = new Nexmo({
      apiKey: '44daecf8',
      apiSecret: '6U5qsbqgTyYUzryE'
    });

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
