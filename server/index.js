var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var fs = require('fs');
var readline = require('readline');
var options = {  redirect: true }
app.use(express.static(__dirname + '/../client/dist', options));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

// app.post('/getDirs', getDirs);
app.get('/getLogtypes', getLogtypes);
app.get('/getCaseDirs/:logtype/:caseDir?', getCaseDirs);
app.post('/searchioc', searchioc)

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
  const path = LOGS_HOME_PATH + logtype + '/' + caseDir;
  fs.readdir(path, (err, result) => {
    if (err) res.send(ERROR_MSG);
    if (result) {
      res.send(result);
    }
  })
}

function searchioc(req, res) {
  console.log('++++++++++++ inside searchioc +++++++++')
  var cases = req.body.selectedIOCCaseIDs;
  var logType = req.body.selectedLogType;
  var logDir = req.body.selectedCaseDir;
  var files = req.body.selectedCaseFiles;


  var OUTPUT_PATH = LOGS_HOME_PATH+'result/';
  var OUTPUT_FILE = OUTPUT_PATH+'test.txt';

  if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH);
  var writeStream = fs.createWriteStream(OUTPUT_FILE, {'flags': 'a'});


  var logFilesOFAllSelectedCases = [];

  for (var i = 0; i < cases.length; i++) {
    for (var j = 0; j < files.length; j++) {
      logFilesOFAllSelectedCases.push(`${LOGS_HOME_PATH}${logType}/${logDir}/${files[j]}`);
    }
  }

  var query = '{"caseName":"APT100", "versionNum":"latest"}' // hardcoding, need to be triggered based on event

  request.post('http://crud-node:5001/readioc', {form:{"query":query}}, ((err, resp, body) => {

      console.log('In the posssstt!!', body)
      var IOC = JSON.parse(body); // array of IOC of latest version
      console.log('lets see the IOC is ', IOC);

      for (var j = 0; j < logFilesOFAllSelectedCases.length; j++) {
        var logFile = logFilesOFAllSelectedCases[j];

        console.log('lalalalalalal', logFilesOFAllSelectedCases[j])

        var rl = readline.createInterface({
          input: fs.createReadStream(logFile),
          crlfDelay: Infinity
        });

        rl.on('line', (line) => {
          for (var i = 0; i < IOC.length; i++) {
            if (line.includes(IOC[i])) {
              writeStream.write(`Line from file ${logFile} for ${IOC[i]}: ${line} \n`);
              console.log(`Line from file ${logFile} for ${IOC[i]}: ${line}`);
            }
          }
        });
      }
   }));
    // writeStream.end();
    res.send('async searching')
}

var port = process.env.PORT || 5002;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});





