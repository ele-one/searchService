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
  const path = LOGS_HOME_PATH + logtype + '/' + caseDir;
  fs.readdir(path, (err, result) => {
    if (err) res.send(ERROR_MSG);
    if (result) {
      res.send(result);
    }
  })
}

function search(req, res) {

  var cases = req.body.selectedIOCCaseIDs;
  var logType = req.body.selectedLogType;
  var logDir = req.body.selectedCaseDir;
  var files = req.body.selectedCaseFiles;

  var logFilesOFAllCases = [];

  for (var i = 0; i < cases.length; i++) {
    for (var j = 0; j < files.length; j++) {
      logFilesOFAllCases.push(`${LOGS_HOME_PATH}${logType}/${cases[i]}/${logDir}/${files[j]}`);
    }
  }

  // // hardcoding one file from logFilesOFAllCases;
  var logFile = 'caselogs/access/neuron/access.log.1';

// Method 1
  // var stream = fs.createReadStream(logFile, 'utf8');

  // stream.on('data', (chunk) => {
  //   if (chunk.includes('yasdsdshoo')) console.log('data of stream is', chunk.toString());
  // });
  // stream.on('error',(err) => {
  //     console.log(err)
  // });
  // stream.on('close', (err) => {
  //    console.log(err)
  // });


// Method 2
  // fs.readFile(logFile, (err, data) => {
  //   console.log('data of file is', data);
  //   if(data.indexOf('yahoowewewew') >= 0){
  //    console.log('founddd', data)
  //   }
  // })

  // console.log(logFilesOFAllCases)



// MEthod 3

  var IOC = ['yahoo', 'splunk'];

  var OUTPUT_PATH = LOGS_HOME_PATH+'result/'
  var OUTPUT_FILE = OUTPUT_PATH+'test.txt'


  const rl = readline.createInterface({
    input: fs.createReadStream(logFile),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (!fs.existsSync(OUTPUT_PATH)) fs.mkdirSync(OUTPUT_PATH);

    var writeStream = fs.createWriteStream(OUTPUT_FILE, {'flags': 'a'});

    for (var i = 0; i < IOC.length; i++) {
      if (line.includes(IOC[i])) {
        writeStream.write(`Line from file ${logFile} for ${IOC[i]}: ${line} \n`);
        console.log(`Line from file ${logFile} for ${IOC[i]}: ${line}`);
      }
    }

    writeStream.end();
  });

    res.send('success')
  }

var port = process.env.PORT || 5002;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

