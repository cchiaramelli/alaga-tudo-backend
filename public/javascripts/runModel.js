const {getWeatherForecast} = require('./getWeatherForecast')

const threshold = 0.62;

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
		name: 'LOCATIONBUTANTA',
		value: 2.13,
	},{
		name: 'LOCATIONCAMPOLIMPO',
		value: 0.032,
	},{
		name: 'LOCATIONCAPELADOSOCORRO',
		value: -0.148,
	},{
		name: 'LOCATIONCASAVERDE',
		value: 0.448,
	},{
		name: 'LOCATIONCIDADEADEMAR',
		value: -1.067,
	},{
		name: 'LOCATIONCIDADETIRADENTES',
		value: -16.739,
	},{
		name: 'LOCATIONERMELINDAMATARAZZO',
		value: -2.917,
	},{
		name: 'LOCATIONFREGUESIA',
		value: 0.363,
	},{
		name: 'LOCATIONGUAIANASES',
		value: -2.305,
	},{
		name: 'LOCATIONIPIRANGA',
		value: 0.985,
	},{
		name: 'LOCATIONITAIMPAULISTA',
		value: -1.299,
	},{
		name: 'LOCATIONITAQUERA',
		value: -0.722,
	},{
		name: 'LOCATIONJABAQUARA',
		value: -3.590,
	},{
		name: 'LOCATIONJACANA',
		value: -1.007,
	},{
		name: 'LOCATIONLAPA',
		value: 1.975,
	},{
		name: 'LOCATIONMBOIMIRIM',
		value: 0.298,
	},{
		name: 'LOCATIONMOOCA',
		value: 1.919,
	},{
		name: 'LOCATIONPARELHEIROS',
		value: -3.391,
	},{
		name: 'LOCATIONPENHA',
		value: 0.855,
	},{
		name: 'LOCATIONPERUS',
		value: -1.804,
	},{
		name: 'LOCATIONPINHEIROS',
		value: 0.787,
	},{
		name: 'LOCATIONPIRITUBA',
		value: 0.787,
	},{
		name: 'LOCATIONSANTANA',
		value: 1.216,
	},{
		name: 'LOCATIONSANTOAMARO',
		value: 1.618,
	},{
		name: 'LOCATIONSAOMATHEUS',
		value: -1.635,
	},{
		name: 'LOCATIONSAOMIGUELPAULISTA',
		value: -1.037,
	},{
		name: 'LOCATIONSAOPOPEMBA',
		value: -16.519,
	},{
		name: 'LOCATIONSE',
		value: 2.059,
	},{
		name: 'LOCATIONVILAMARIA',
		value: 0.467,
	},{
		name: 'LOCATIONVILAMARIANA',
		value: 1.29,
	},{
		name: 'LOCATIONVILAPRUDENTE',
		value: 0.877,
	},
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
	console.log('Running', locationString)

	var location = locationsWeights.find(loc => loc.name == locationString)
	location = location.value || 0

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
			
			if(sigmoid(result)>threshold){
				willFlood = true;
				return;
			}
		})

		return willFlood
	})
}

module.exports = { runModel }