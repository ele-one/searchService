var express = require('express');
var bodyParser = require('body-parser');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

app.get('/', (req,res)=> {
  res.sendFile('index.html', { root: 'client/public'});
});
app.get('/items/:id', getItems);
app.get('/products', getProducts);

app.post('/login', login);
app.post('/signup', signup);


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Route Functions
+ + + + + + + + + + + + + + + + + + + + + + + + + + + + + + */

function restrict() {
// code here if cookie is verified
  // next()
// else redirect to login page
}

function getItems(req, res) {
  // req.params.id
}


function getProducts(arg, restrict, cb) {

}


function login(username, password) {
  // req.body
}


function signup() {

}

var port = process.env.PORT || 3200;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

