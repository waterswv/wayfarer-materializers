// we did not use 'use strict'
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// setting up port variable for displaying our current port in the console
var port = process.env.API_PORT || 3001;

// Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//ROUTES

//router config for calling the API
app.use('/api', router);
app.use('/', router);

// set route path and init API
router.get('/', function(req, res){
  res.json({message: 'API Initialized'});
});

app.get("/", function(req, res) {
  res.sendFile("views/index.html", {
    root: __dirname
  });
  console.log(__dirname);
});

router.route("/cities")
  .get(function(req, res){
    res.sendFile("views/city.html", {
      root: __dirname
  });
});

router.route('/cities/1')
.get(function(req, res) {
  res.sendFile("views/post.html", {
    root: __dirname
  });
  console.log(__dirname);
});


/************
 * server *
************/

app.listen(port, function() {
  console.log("Server Up!!");
});
