// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


module.exports = function(app){
// ===============================================================================
// ROUTING
// ===============================================================================


  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
  app.get('/',function(request, response){
		response.sendFile(path.join(__dirname, '../public/home.html'));
	});
	app.get('/survey',function(request, response){
		response.sendFile(path.join(__dirname,'../public/survey.html'));
	});
}

  // If no matching route is found default to home
  //   app.use(function(request, response){
	// 	response.sendFile(path.join(__dirname, '../public/index.html'));
	// });