// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on all possible friends
// ===============================================================================
var friends = require('../data/friends.js');
//console.log(friends[0].name);
module.exports = function (app) {

  // ===============================================================================
  // ROUTING
  // ===============================================================================


  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function (request, response) {
    response.json(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // ---------------------------------------------------------------------------


  // Note the code here. Our "server" will respond to a user"s survey result
  // Then compare those results against every user in the database.
  // It will then calculate the difference between each of the numbers and the user"s numbers.
  // It will then choose the user with the least differences as the "best friend match."
  // In the case of multiple users with the same result it will choose the first match.
  // After the test, it will push the user to the database.
  app.post("/api/friends", function (request, response) {
    var newClient = request.body;
    //console.log(friends[0].score[0]);

    //console.log(newClient);
    // We will use this object to hold the "best match". We will constantly update it as we
    // loop through all of the options

    for (var i = 0; i < newClient.scores.length; i++) {
      if (newClient.scores[i] === "1 (Strongly Disagree)") {
        newClient.scores[i] = 1;
      } else if (newClient.scores[i] === "5 (Strongly Agree)") {
        newClient.scores[i] = 5;
        // Here we take the result of the user"s survey POST and parse it.
      } else {
        newClient.scores[i] = parseInt(newClient.scores[i]);
      }
    }



    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var diff = [];

    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {
      var clientMatch = friends[i];
      var Difference = 0;
      // We then loop through all the scores of each friend
      for (var j = 0; j < clientMatch.scores.length; j++) {
        var clientDifference = Math.abs(clientMatch.scores[j] - newClient.scores[j]);
        Difference += clientDifference;
      }
      // We calculate the difference between the scores and sum them into the Difference
      diff.push(Difference);
    }
    var num = diff[0];
    var index = 0;
    // If the sum of differences is less then the differences of the current "best match"
    for (var x = 0; x < diff.length; x++) {
      if (diff[x] < num) {
        num = diff[x];
        index = x;
      }
    }
    // Reset the bestMatch to be the new friend.
    friends.push(newClient);

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).


    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    response.json(friends[index]);
  });

}

