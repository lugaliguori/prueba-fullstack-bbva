const http = require('http');
const environment = require('./env');

const options = {
    hostname: 'api.weatherapi.com',
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  };

module.exports = {
    async getWeatherForecast(location){
        return new Promise((resolve,reject) => {
            options.path = `/v1/forecast.json?q=${location}&days=5&key=${environment.apiKey}`
            const req = http.request(options, async (res) => {
                console.log(`statusCode: ${res.statusCode}`);
                let data = []
                res.on('data', (d) => {
                    data.push(d)
                });
                res.on('end', () => {
                    const forecast = JSON.parse(Buffer.concat(data).toString())
                    resolve(forecast)
                })
            });
            
            req.on('error', (error) => {
                reject(error)
            });
            req.end()
        })
    }
}