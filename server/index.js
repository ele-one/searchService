var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var fs = require('fs');

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

// app.post('/getDirs', getDirs);
app.get('/getLogtypes', getLogtypes);
app.get('/getCaseDirs/:logtype/:caseDir?', getCaseDirs);
app.post('/search', search)

const SUCCESS_MSG = 'transaction succeeded';
const ERROR_MSG = 'failed'
const LOGS_HOME_PATH = 'caselogs/'

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

// function getDirs(req, res) {
//   console.log('Inside server folder')
//   const logtype = req.body.logtype;
//   const parentdir = 'caselogs/' + logtype;

//   fs.readdir(parentdir, (err, result) => {
//     if (err) res.send(ERROR_MSG);
//     if (result) {
//       res.send(result);
//     }
//   })
// }

function getLogtypes(req, res) {
  fs.readdir(LOGS_HOME_PATH, (err, result) => {
    if (err) res.send(ERROR_MSG);
    if (result) {
      res.send(result);
    }
  })
}


function getCaseDirs(req, res) {
  const logtype = req.params.logtype;
  const caseDir = req.params.caseDir || '';
  console.log(req.params)
  const path = LOGS_HOME_PATH + logtype + '/' + caseDir
  console.log(path)
  fs.readdir(path, (err, result) => {
    if (err) res.send(ERROR_MSG);
    if (result) {
      res.send(result);
    }
  })
}

function search(req, res) {
  console.log(req.body)
  res.send('success')
}

var port = process.env.PORT || 5002;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

