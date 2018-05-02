// initializes survey data
var friends = require("../data/friends.js");

// function which returns or adds friends
module.exports = function(app) {

  // GET REQUEST
  // returns list of all possible friends
  app.get("/api/friends", function(request, response) {
    response.json(friends);
  });

  // POST REQUEST
  // adds a new friend
  app.post("/api/friends", function(request, response) {
    friends.push(request.body);

    // grabs array of user's scores
    var newFriend = request.body;
    var scoresArray = newFriend["scores[]"];

    // initializes compatibility variables 
    var leastDifference = 100;
    var index = -1;

    for (var i = 0; i < friends.length - 1; i++) {
      // resets total difference in score
      var totalDifference = 0;

      // grabs array of existing users' scores
      var friend = friends[i];
      var friendScores = friend["scores[]"];

      // compares score arrays and adds up the total difference in score
      for (var j = 0; j < 10; j++) {
        var difference = Math.abs(parseInt(friendScores[j]) - parseInt(scoresArray[j]));
        totalDifference += difference;
      }

      // if the total difference in score is less than the current least difference in score, update the least difference and most compatible friend
      if (totalDifference < leastDifference) {
        leastDifference = totalDifference;
        index = i;
      }
    }

    // pass the most compatible friend back to survey.html to be displayed
    response.json(friends[index]);
  });

  // clears all data
  app.post("/api/clear", function() {
    friends = [];
  });
};