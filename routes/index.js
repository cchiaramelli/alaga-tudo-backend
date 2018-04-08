var express = require('express');
var router = express.Router();

const { sendWarningMail } = require('../public/javascripts/sendMail')
const { getWeatherForecast } = require('../public/javascripts/getWeatherForecast')
const { runModel } = require('../public/javascripts/runModel')
let {users} = require('../public/sampledata/users')

const fetch = require('node-fetch')
global.Headers = fetch.Headers;

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
				date.setDate(date.getDate() + 1)

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
		res.status(200).send({results})
	})
	.catch(err => {err})
})

router.get('/forecast', async function(req, res, next) {

	const todayForecast = await getWeatherForecast(new Date())

	res.send(todayForecast)
})

router.get('/req', async function(req, res, next) {

	const a = await fetch('https://alagatudo.now.sh/predict', {
	  method: 'get',
	  mode: 'no-cors',
	  headers: new Headers({
	    'Content-Type': 'application/json',
	  }),
	})
	.then(res => res.json())
	.catch((err) => {
	  console.log(err);
	  return null;
	});

	console.log(a)
})
module.exports = router;