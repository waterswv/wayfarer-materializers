// we did not use 'use strict'
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
let db = require('./models');

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

//HTML ENDPOINT
app.get("/", function(req, res) {
  res.sendFile("views/index.html", {
    root: __dirname
  });
  console.log(__dirname);
});

//API ENDPOINTS

//router config for calling the API
app.use('/api', router);
app.use('/', router);

// set route path and init API
router.get('/', function(req, res){
  res.json({message: 'API Initialized'});
});

router.route("/cities")
  .get(function(req, res){
    res.sendFile("views/city.html", {
      root: __dirname
  });
});

router.route('/cities/1')
.get(function(req, res) {
  db.Post.find({}, function(err, allPosts) {
    if (err) {
      console.log(err);
    }
    res.json(allPosts);
  })
})
.post(function(req, res) {
  let post = new db.Post();

  post.title = req.body.title;
  post.description = req.body.description;

  post.save(function(err) {
    if (err)
      res.send(err);
    res.json(post);
  })
})


/************
 * server *
************/

app.listen(port, function() {
  console.log("Server Up!!");
});
