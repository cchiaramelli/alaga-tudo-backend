var express = require('express');
var router = express.Router();

const { sendWarningMail } = require('../public/javascripts/sendMail')
const { getWeatherForecast } = require('../public/javascripts/getWeatherForecast')
const { runModel } = require('../public/javascripts/runModel')
let {users} = require('../public/sampledata/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/predict',  function(req, res, next) {

	users.forEach(user => {
		user.locations.forEach(location => {
			console.log('location', location)
			var date = new Date();
			for (i=0; i<user.daysPredict; i++){
				console.log('Date', date)
				runModel(('LOCATION'+location).toUpperCase(), date).then(results => {
					const body = {
						...user,
						date,
						location,
					}
					if (results){
						//Will flood!
						if (body.email) sendWarningMail(body)
						if (body.phone) sendSms(body)
					}
				})
				.catch(err => {err})
				
				date.setDate(date.getDate() + 1)
			}
		})
	})
	res.send('nice')
})

router.post('/predict', function(req, res, next) {
	console.log('POST')

	const body = req.body;

	console.log('Body', body)

	runModel(('LOCATION'+body.location).toUpperCase(), body.date).then(results => {

		if (results){
			//Will flood!
			if (user.email) sendWarningMail(user)
			if (user.phone) sendSms(user)
		}
		res.status(200).send({results})
	})
	.catch(err => {err})
})

router.get('/forecast', async function(req, res, next) {

	const todayForecast = await getWeatherForecast(new Date())

	res.send(todayForecast)
})

module.exports = router;