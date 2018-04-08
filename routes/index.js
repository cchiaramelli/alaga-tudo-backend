var express = require('express');
var router = express.Router();

const { sendWarningMail } = require('../public/javascripts/sendMail')
const { getWeatherForecast } = require('../public/javascripts/getWeatherForecast')
const { runModel } = require('../public/javascripts/runModel')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/predict', function(req, res, next) {
	console.log('POST')
	
	const body = req.body;

	const { date, latitude, longitude } = body

	console.log('Body', body)

	runModel('mylocation').then(results => {
		if (results){
			//Will flood!
			// sendWarningMail({email: 'gmcrivelli@gmail.com'})
		}
		res.send(results)
	})
})

router.get('/forecast', async function(req, res, next) {

	const todayForecast = await getWeatherForecast(new Date())

	res.send(todayForecast)
})

module.exports = router;