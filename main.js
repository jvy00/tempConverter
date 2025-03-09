// De la Cruz, Juvy Anncel

const http = require('http');
const fs = require('fs');
const url = require('url');


function celsiusToFahrenheit(c){
    return (c * 9/5) + 32; 
}

function fahrenheitToCelsius(f){
    return (f - 32) * 5/9;
}

// Function to handle temperature conversions
function handleConversion(res, query) {
    let temperature, convertedTemp, unit;
    if (query.type === 'c') {
        temperature = parseFloat(query.value);
        if (!isNaN(temperature)) {
            convertedTemp = celsiusToFahrenheit(temperature);
            unit = '°F';
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid temperature value');
            return;
        }
    } else if (query.type === 'f') {
        temperature = parseFloat(query.value);
        if (!isNaN(temperature)) {
            convertedTemp = fahrenheitToCelsius(temperature);
            unit = '°C';
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid temperature value');
            return;
        }
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid conversion type');
        return;
    }

    // Send the conversion result
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (query.type === 'c') {
        res.end(`${temperature}°C = ${convertedTemp}${unit}`);
    } else {
        res.end(`${temperature}°F = ${convertedTemp}${unit}`);
    }
}

// Create a server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    if (parsedUrl.pathname === '/convert') {
        handleConversion(res, query);

    } else if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/index.html') {
        fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Error loading HTML file');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });

    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
