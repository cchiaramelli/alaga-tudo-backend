var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/predict', function(req, res, next) {

	//Date
	//Latitude
	//Longitude

	const body = req.body;

	const { date, latitude, longitude } = body

	console.log('Body', body)

	const results = {
		probability: 0.5,
	}

	res.send(results)
})

module.exports = router;