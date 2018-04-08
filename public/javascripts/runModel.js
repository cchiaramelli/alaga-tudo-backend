const {getWeatherForecast} = require('./getWeatherForecast')

const threshold = 0.9;

const compareDates = (a, b) => {
	return (new Date(a).getUTCFullYear() == new Date(b).getUTCFullYear() &&
			new Date(a).getUTCMonth() == new Date(b).getUTCMonth() &&
			new Date(a).getUTCDate() == new Date(b).getUTCDate())
}

const multMatrices = (a,b) => {
	var sum = 0.0
	Object.keys(a).forEach(key => {
		sum += a[key]*b[key]
	})

	return sum
}

const sigmoid = (x) => 1/(1+Math.exp(-x))

const locationsWeights = [
	{
		name: 'locationmylocation',
		value: 0.032,
	}
]

const model = {
	min_temp: 1.270,
	wind_gust: 0.046,
	wind_degree: 0.043,
	precip: 0.741,
	visibility: 0.066,
	location: 1,
	intercept: -0.737
}

const meanSd = {
	min_temp: {
		mean: 17.4463995117982,
		SD: 2.97077172986713,
	},
	wind_gust: {
		mean: 12.9012917005696,
		SD: 5.9045252958363,
	},
	wind_degree: {
		mean: 187.387103336046,
		SD: 101.583567296879,
	},
	precip: {
		mean: 2.19880492270138,
		SD: 3.96270439035286,
	},
	visibility: {
		mean: 7.05044751830757,
		SD: 2.97973248443201,
	},
}

var weekForecast = getWeatherForecast()

const runModel = (locationString, date) => {
	console.log('Running')

	const location = locationsWeights.find(loc => loc.name == locationString).value || 0;

	var willFlood = false;

	return weekForecast.then(week => {

		const day = week.find(day => compareDates(day.date , date)).hours

		if (!day) {
			console.log("DATE DOESNT EXIST")
			return null
		}

		day.forEach(hour => {

			const filteredHour = {};
			Object.keys(hour).forEach(key => {
				filteredHour[key] = (hour[key]-meanSd[key].mean)/meanSd[key].SD
			})
			const result = multMatrices(model, {
				...filteredHour,
				location,
				intercept: 1,
			})

			console.log('result', result)
			console.log('sig(res)', sigmoid(result))

			if(sigmoid(result)>threshold){
				willFlood = true;
				return;
			}
		})

		return willFlood
	})
}

module.exports = { runModel }