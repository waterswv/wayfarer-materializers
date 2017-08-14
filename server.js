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
let port = process.env.PORT || 3001;

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
// app.use('/', router);

// set route path and init API
router.get('/', function(req, res){
  res.json({
    message: "Welcome to Project Wayfarer!",
    baseUrl: "",
    documentationUrl: "https://github.com/waterswv/wayfarer-materializers",
    authors: [ "Chris Pinotti", "Bryan Mierke", "Daryl Jason Lazaro" ],
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      // CITIES
      {method: "GET", path: "/api/cities", description: "Index of all cities"},
      {method: "GET", path: "/api/cities/:id", description: "Show one id-specified city"},
      {method: "POST", path: "/api/cities", description: "Create new city"},
      {method: "PUT", path: "/api/cities/:id", description: "Update one id-specified city"},
      {method: "DELETE", path: "/api/cities/:id", description: "Destroy one id-specified city"},

      // POSTS
      {method: "GET", path: "/api/cities/:id/posts", description: "Show a list of posts for an id-specified city"},
      {method: "GET", path: "/api/cities/:city_id/posts/:post_id", description: "Show one id-specified post"},
      {method: "POST", path: "/api/cities/:id/posts", description: "Create a new post within an id-specified city"},
      {method: "PUT", path: "/api/cities/:city_id/posts/:post_id", description: "Update one id-specified post"},
      {method: "DELETE", path: "/api/cities/:city_id/posts/:post_id", description: "Destroy one id-specified post"}
    ]
  });
});

// CITIES ROUTES
router.route("/cities")
// Index of all cities
.get(function index(req, res) {
  db.City.find({}, function(err, allCities) {
    if (err) res.send(err);
    res.json({cities: allCities});
  })
})
// Create new city
.post(function create(req, res) {
  let newCity = new db.City({
  cityName: req.body.cityName,
  cityCountry: req.body.cityCountry,
  cityImage: req.body.cityImage,
  posts: []
  });

  // save neighborhood to DB
  newCity.save(function(err, city) {
    if (err) res.send(err);
    console.log('created city', city);
    res.json(city);
  })
});

// CITIES BY ID ROUTES
router.route('/cities/:id')
// Show one id-specified city
.get(function show(req, res) {
  let cityId = req.params.id;
  console.log('retrieving city', cityId);

  db.City.findById(cityId, function(err, city) {
    if (err) res.send(err);
    res.json({city: city});
  })
})
// Update one id-specified city
.put(function update(req, res) {
  let cityId = req.params.id;
  console.log('show city', cityId);

  db.City.findById(cityId, function(err, city) {
    if (err) res.send(err);
    (req.body.cityName) ? city.cityName = req.body.cityName : null;
    (req.body.cityCountry) ? city.cityCountry = req.body.cityCountry : null;
    (req.body.cityImage) ? city.cityImage = req.body.cityImage : null;
    console.log('updated city', req.body);

    city.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'City updated!' });
    })
  })
})
.delete(function destroy(req, res) {
  db.City.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) res.send(err);
    res.json({ message: 'Neighborhood deleted!' });
  });
});

// POSTS ROUTES
router.route("/cities/:id/posts")
// Show a list of posts for an id-specified city
.get(function index(req, res) {
  db.City.findById(req.params.id, function(err, foundCity) {
    if (err) res.send(err);
    console.log("Responding with posts", foundCity.posts);
    res.json({posts: foundCity.posts});
  })
})
// Create a new post within an id-specified city
.post(function create(req, res) {
  db.City.findById(req.params.id, function(err, foundCity) {
    let newPost = new db.Post({
      title: req.body.title, // FIXME: require 200 character limit
      description: req.body.description //FIXME: require text
    })
    console.log(req.body);

    foundCity.posts.push(newPost);

    foundCity.save(function(err, savedCity) {
      console.log("new Post created!!", newPost);
      res.json(newPost);
    })
  })
});

router.route('/cities/:city_id/posts/:post_id')
// Show one id-specified post
.get(function show(req, res){
  db.City.findById(req.params.city_id, function(err, foundCity) {
    console.log(foundCity);
    let correctPost = foundCity.posts.id(req.params.post_id);
    if (correctPost){
      res.json({post: correctPost})
    } else {
      res.send(err);
    }
  })
})
// Update one id-specified post
.put(function update(req, res) {
  db.City.findById(req.params.city_id, function(err, foundCity) {
    console.log(foundCity);

    let correctPost = foundCity.posts.id(req.params.post_id);
    if (correctPost) {
      console.log(req.body);
      /* setting new title and description to whatever was changed; if nothing was changed we won't alter the field. */
      (req.body.title) ? correctPost.title = req.body.title : null;
      (req.body.description) ? correctPost.description = req.body.description : null;
      foundCity.save(function(err, saved) {
        console.log('UPDATED', correctPost, 'IN ', saved.cities);
        res.json(correctPost);
      });
    } else {
      res.send(err);
    }
  })
})
// Destroy one id-specified post
.delete(function destroy(req, res) {
  db.City.findById(req.params.city_id, function(err, foundCity) {
    console.log(foundCity);

    let correctPost = foundCity.posts.id(req.params.post_id);
    if (correctPost) {
      correctPost.remove();
      foundCity.save(function(err, saved) {
        res.json({ message: 'Post deleted!' });
      });
    } else {
      return console.log(err);
    }
  })
});

/************
 * server *
************/

app.listen(port, function() {
  console.log("Server Up!!");
});
