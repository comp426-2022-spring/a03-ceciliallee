
// Require Express.js
const express = require('express')
const app = express()
const statusCode = 200;
const status = "OK";
const minimist = require("minimist");
const args = minimist(process.argv.slice(2))
args["port"]
const port = args.port ||process.env.PORT|| 3000;

function coinFlip() {
  let randomNum = Math.random();
  if (randomNum > 0.5) {
    return "heads";
  } else {
    return "tails";
  }
}

function coinFlips(flips) {
  const coinArray = [];
  for (let i = 0; i < flips; i++) {
    let randomNum = Math.random();
    if (randomNum > 0.5) {
      coinArray[i] = "heads";
    } else {
      coinArray[i] = "tails";
    }
  }
  return coinArray;
}

function countFlips(array) {
  let headsCount = 0;
  let tailsCount = 0;

  for (let i = 0; i < array.length; i++) {
    if (array[i] == "heads") {
      headsCount++;
    } else {
      tailsCount++;
    }
  }
  return {
    tails: tailsCount,
    heads: headsCount,
  };
}

function flipACoin(call) {
  let result = coinFlip();
  if (result == call) {
    return {
      call: call,
      flip: result,
      result: "win",
    };
  } else {
    return {
      call: call,
      flip: result,
      result: "lose",
    };
  }
}

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port))
});

// Default response for any other request
app.use(function (req, res) {
    res.statusCode = 404;
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
    res.statusCode = statusCode;
    // Respond with status message "OK"
    res.statusMessage = status;
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    res.end(res.statusCode + " " + res.statusMessage);
});

app.get("/app/flip", (req, res) => {
    res.statusCode = 200;
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    let result = coinFlip()
    res.send('{"flip":"' + result + '"}');
});

app.get('/app/flip/call/:number', (req, res) => {
    res.statusCode = statusCode;
    res.writeHead(res.statusCode, { "Content-Type": "text/plan" });
    let flips = coinFlips(req.params.number);
    let sum = countFlips(flips);
    res.status(statusCode).json({
        'raw': flips,
        'summary': sum
    })
});

app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    let flip = flipACoin("heads");
    res.status(statusCode).json(flip);
});

app.get("/app/flip/call/tails", (req, res) => {
    res.statusCode = 200;
    res.writeHead(res.statusCode, { "Content-Type": "text/plain" });
    let flip = flipACoin("tails");
    res.status(statusCode).json(flip);
});


