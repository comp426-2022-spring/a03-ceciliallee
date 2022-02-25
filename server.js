import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express')
const app = express()
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))
const port = args['port']
const aPort = port || 3000;
 
// coin functions
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
// end coin functions

app.get('/app/', (req, res) => {
    res.statusCode = 200
    res.statusMessage = 'OK'
    res.writeHead(res.statusCode, { "Content-Type": CONTENT_TYPE_TEXT_PLAIN });
    res.end(res.statusCode + " " + res.statusMessage);
})

const server = app.listen(port, () => {
  console.log("App listening on port %PORT%".replace("%PORT", port));
});