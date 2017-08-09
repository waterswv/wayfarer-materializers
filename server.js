const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static(__dirname + "./public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", function(req, res) {
  res.sendFile("views/index.html", {
    root: __dirname
  });
  console.log(__dirname);
});

app.get("/city", function(req, res) {
  res.sendFile("views/city.html", {
    root: __dirname
  });
  console.log(__dirname);
});

/************
 * server *
************/

app.listen(process.env.PORT || 3000, function() {
  console.log("Server Up!!");
});
