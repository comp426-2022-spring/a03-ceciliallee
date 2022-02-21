import { coinFlip, coinFlips, countFlips, flipACoin } from "./coin.mjs";
// Require Express.js
const express = require('express')
const app = express()
const statusCode = 200;
const status = "OK";
const args = minimist(process.argv.slice(2))
args["port"]
const port = args.port || 5000;
// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
});

// Default response for any other request
app.use(function (req, res) {
    res.statusCode = 404;
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    res.status(404).send('404 NOT FOUND')
});

app.get('/app', (req, res) => {
    // Respond with status 200
    res.statusCode = statusCode;
    // Respond with status message "OK"
    res.statusMessage = status;
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    res.end(res.statusCode + " " + res.statusMessage);
});

app.get("/app/flip", (req, res) => {
    let flipRes = coinFlip()
    res.status(status).json({
        'flip': flipRes
    })
});

