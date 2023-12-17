const http = require('node:http');
const flight = require('./scrappingInfo')
const forecast = require('./getForecast')

const hostname = '127.0.0.1';
const port = 3000;

const handleFlightRequest = async (req, res) => {
  try {
    var body = '';
    const waitForEndEvent = new Promise((resolve) => {
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(); // Resolve the promise when the 'end' event is triggered
      });
    });

    // Wait for the Promise to resolve
    await waitForEndEvent;
    body = JSON.parse(body)
    const vuelos = await flight.scrapeGoogleFlights(body.origin, body.destination,body.date);
    const clima = await forecast.getWeatherForecast(body.destination);
    sendResponse(res, 200, { flights: vuelos, weather: clima });
  }catch(e){
    if(e == 'Error: no se encontraron resultados'){
      sendResponse(res, 404, e.toString());
    } else{
      sendResponse(res, 400, e.toString());
    }
  }finally{
    res.end()
  }
};

const handleOptionsRequest = (res) => {
  sendResponse(res, 200);
};

const sendResponse = (res, statusCode, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.writeHead(statusCode);

  if (data) {
    res.write(JSON.stringify(data));
  }

  res.end();
};

const server = http.createServer(async (req, res) => {
  const url = req.url;
  if (url === '/flights' && req.method === 'POST') {
    await handleFlightRequest(req, res);
  } else if (req.method === 'OPTIONS') {
    handleOptionsRequest(res);
  } else {
    sendResponse(res, 404, 'Not Found');
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});