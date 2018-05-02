// initialize path Node.js package
var path = require("path");

// function which displays the correct html page upon request
module.exports = function(app) {
	// displays survey page
	app.get("/survey", function(request, response) {
		response.sendFile(path.join(__dirname, "../public/survey.html"));
	});

	// otherwise defaults to home page
	app.get("*", function(request, response) {
	    response.sendFile(path.join(__dirname, "../public/home.html"));
	});
};