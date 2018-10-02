var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var fs = require('fs');
var readline = require('readline');
app.use(express.static(__dirname + '/../client/dist'));

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
const SEARCH_RESULT_PATH = 'brownSearchResult/'
const LOGS_HOME_PATH = 'caselogs/'

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

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


var _getlistOFLogFiles = function(LOGS_HOME_PATH, logType, logDir, files) {

  var logFilesToSearch = [];

  // for flow 2 - manual user request
  if (logType !== '*' && logDir !== undefined && files !== undefined) {
    for (var i = 0; i < files.length; i++) {
      logFilesToSearch.push(`${LOGS_HOME_PATH}${logType}/${logDir}/${files[i]}`)
    }
  }

  // for flow 2 - manual user request
  if (logType === '*') {
    // Get logTypes in under the LOGS_HOME_PATH e.g. ssh, access, vpn etc.
    var logTypes = fs.readdirSync(LOGS_HOME_PATH).filter((file) => {
      return fs.statSync(LOGS_HOME_PATH + file).isDirectory();
    });

    for (j = 0; j < logTypes; j++) {
      var logDirPath = LOGS_HOME_PATH + logTypes[j] + '/' + logDir;
      logFilesToSearch = fs.readdirSync(logDirPath).filter( (file) => {
        return fs.statSync(logDirPath + '/' + file).isFile();
      })
    }

  }

  return logFilesToSearch;
}

function searchioc(req, res) {
  console.log('++++++++++++ inside searchioc +++++++++')

  // Flow 1 - request came from event triggers when new IOC(s) added.
  if (req.body.caseID && req.body.caseIOCs) {
    var IOCCaseID = req.body.caseID;
    var logDir = IOCCaseID;
    var IOCsDiff = req.body.IOCsDiff;
    var IOCCaseVersion = req.body.caseVersion;
    var logType = "*"
    var OUTPUT_FILE_NAME = 'auto_search.txt';
    var QUERY = `{"caseName":"${caseID}", "versionNum":"${caseVersion}"}`

  // Flow 2 - the request came from the manual user request (via UI)
  } else {
    var IOCCaseID = req.body.selectedIOCCaseID;
    var IOCCaseVersion = req.body.selectedIOCCaseVersion || "latest"
    var logType = req.body.selectedLogType;
    var logDir = req.body.selectedCaseDir;
    var files = req.body.selectedCaseFiles;
    var OUTPUT_FILE_NAME = 'manual_search.txt';
    var QUERY = `{"caseName":"${IOCCaseID}", "versionNum":"${IOCCaseVersion}"}  `
  }


  // var logFilesToSearch = [];

  if (!fs.existsSync(SEARCH_RESULT_PATH)) fs.mkdirSync(SEARCH_RESULT_PATH);
  var OUTPUT_FILE = SEARCH_RESULT_PATH + OUTPUT_FILE_NAME;
  var writeStream = fs.createWriteStream(OUTPUT_FILE, {'flags': 'a'});


  var logFilesToSearch = _getlistOFLogFiles(LOGS_HOME_PATH, logType, logDir, files)

  console.log('opopopopopopopopopopo', logFilesToSearch);

  //var query = '{"caseName":"APT100", "versionNum":"latest"}' // hardcoding, need to be triggered based on event


  request.post('http://crud-node:5001/readioc', {form:{"query":QUERY}}, ((err, resp, body) => {

      console.log('In the posssstt!!', body)
      var IOCs = JSON.parse(body); // array of IOCs of latest version
      console.log('lets see the IOCs is ', IOCs);

      for (var j = 0; j < logFilesToSearch.length; j++) {
        var logFile = logFilesToSearch[j];

        console.log('lalalalalalal', logFilesToSearch[j])

        var rl = readline.createInterface({
          input: fs.createReadStream(logFile),
          crlfDelay: Infinity
        });

        rl.on('line', (line) => {
          for (var i = 0; i < IOCs.length; i++) {
            if (line.includes(IOCs[i])) {
              writeStream.write(`Line from file ${logFile} for ${IOCs[i]}: ${line} \n`);
              console.log(`Line from file ${logFile} for ${IOCs[i]}: ${line}`);
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





