// Express DEPENDENCY

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

// Sets an initial port. We"ll use this later in our listener
var app = express();
var port = process.env.PORT || 3000;

// express.json and express.urlEncoded make it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// ==============================================================================
// LISTENER
// The below code effectively "starts" our server
// ==============================================================================
app.listen(port, function() {
  console.log("App listening on PORT " + PORT);
});