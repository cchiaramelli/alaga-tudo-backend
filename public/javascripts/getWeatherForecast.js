const fetch = require('node-fetch')

const getWeatherForecast = async (day) => {

	const url = 'http://api.worldweatheronline.com/premium/v1/weather.ashx?q=Sao+paulo&key=98838052564549b3b27230627180704&format=json&num_of_days=7'
	json = await fetch(url, {
		mode: 'GET',
	})
	.then(res => res.json())
	.catch(err => {err})

	if (json.err){
		console.log('Err', json.err)
		return;
	}

	return json.data.weather.map((day) => {
		return {
			hours: day.hourly.map(hour => {
				return {
					// date: day.date,
					// time: hour.time/300,
					// maxtempC: day.maxtempC,
					// mintempC: day.mintempC,
					// tempC: hour.tempC,
					// windspeedKmph: hour.windspeedKmph,
					// winddirDegree: hour.winddirDegree,
					// weatherCode: hour.weatherCode,
					// precipMM: hour.precipMM,
					// humidity: hour.humidity,
					// visibility: hour.visibility,
					// pressure: hour.pressure,
					// cloudcover: hour.cloudcover,
					// HeatIndexC: hour.HeatIndexC,
					// DewPointC: hour.DewPointC,
					// WindChillC: hour.WindChillC,
					// WindGustKmph: hour.WindGustKmph,
					// FeelsLikeC: hour.FeelsLikeC,
					min_temp: day.mintempC,
					wind_gust: hour.windspeedKmph,
					wind_degree: hour.winddirDegree,
					precip: hour.precipMM,
					visibility: hour.visibility,
				}
			}),
			date: day.date,
		}
	})
}
module.exports = { getWeatherForecast }