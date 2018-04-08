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

	console.log('users', users)
	users.forEach(user => {
		user.locations.forEach(location => {
			console.log('location', location)
			for (i=0; i<user.daysPredict; i++){
				var date = new Date();
				date.setDate(date.getDate() + i)

				runModel(('LOCATION'+location).toUpperCase(), date).then(results => {
					console.log('Res for ', location, date, results)
					if (results){
						//Will flood!
						// sendWarningMail(body)
						//sendWarning
					}
					res.send(results)
				})
				.catch(err => {err})
			}
		})
	})
	// })
})

router.post('/predict', function(req, res, next) {
	console.log('POST')

	const body = req.body;

	console.log('Body', body)

	runModel(('LOCATION'+body.location).toUpperCase(), body.date).then(results => {
		console.log('Res', results)
		if (results){
			//Will flood!
			sendWarningMail(body)
			//sendWarning
		}
		res.send(results)
	})
	.catch(err => {err})
})

router.get('/forecast', async function(req, res, next) {

	const todayForecast = await getWeatherForecast(new Date())

	res.send(todayForecast)
})

module.exports = router;