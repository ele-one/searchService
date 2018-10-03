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

    var logFilesInCaseDir = [];

    for (j = 0; j < logTypes.length; j++) {
      var logDirPath = LOGS_HOME_PATH + logTypes[j] + '/' + logDir;
      if (fs.existsSync(logDirPath)) {
        fs.readdirSync(logDirPath).filter( (file) => {
          if (fs.statSync(logDirPath + '/' + file).isFile()) logFilesInCaseDir.push(logDirPath + '/' + file);
        })
      }
    }
    logFilesToSearch.push(...logFilesInCaseDir);
  }

  return logFilesToSearch;
}

function searchioc(req, res) {
  console.log('++++++++++++ inside searchioc +++++++++', req.body)

  if (!fs.existsSync(SEARCH_RESULT_PATH)) fs.mkdirSync(SEARCH_RESULT_PATH);
  var OUTPUT_FILE_AUTO = SEARCH_RESULT_PATH + 'auto_search.txt';
  var OUTPUT_FILE_MANUAL =  SEARCH_RESULT_PATH + 'manual_search.txt';

  // Flow 1 - request came from crud service called on ioc create or update.
  if (req.body.query) {
    console.log('INSIDE AUTOOOOOOO')
    var reqQuery = JSON.parse(req.body.query);
    var IOCCaseName = reqQuery.caseName;
    var logDir = IOCCaseName; // assumed that the case directory has same name as case name.
    var IOCs = reqQuery.IOCsDiff;
    var logType = "*";

    var writeStream = fs.createWriteStream(OUTPUT_FILE_AUTO, {'flags': 'a'});
    var logFilesToSearch = _getlistOFLogFiles(LOGS_HOME_PATH, logType, logDir, files);

    for (var j = 0; j < logFilesToSearch.length; j++) {
      var logFile = logFilesToSearch[j];
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

  // Flow 2 - the request came from the manual user request (via UI)
  }

  if (req.body.selectedIOCCaseID) {
    console.log('INSIDE MANUALLLLLLLL')
    var IOCCaseID = req.body.selectedIOCCaseID;
    var IOCCaseVersion = req.body.selectedIOCCaseVersion || "latest"
    var logType = req.body.selectedLogType;
    var logDir = req.body.selectedCaseDir;
    var files = req.body.selectedCaseFiles;
    var OUTPUT_FILE_NAME = 'manual_search.txt';
    var QUERY = `{"caseName":"${IOCCaseID}", "versionNum":"${IOCCaseVersion}"}  `

    var writeStream = fs.createWriteStream(OUTPUT_FILE_MANUAL, {'flags': 'a'});
    var logFilesToSearch = _getlistOFLogFiles(LOGS_HOME_PATH, logType, logDir, files)

    console.log('opopopopopopopopopopo', logFilesToSearch);

     request.post('http://crud-node:5001/readioc', {form:{"query":QUERY}}, ((err, resp, body) => {
        console.log('In the posssstt!!', body)
        var IOCs = JSON.parse(body);
        console.log('lalalalallalalallall')
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
        res.send('done!!!')
        // writeStream.end();
    }
}

var port = process.env.PORT || 5002;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


