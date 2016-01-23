var express = require('express');
var http = require('http');
var app = express();
var fs = require('fs');

var config = require('./js/config.json');
var materials = require('./js/materials.js');


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname));

//MAIN landing URL
app.get('/', function(req, res) {
	console.log("operating in dirname: " + __dirname);
	res.sendFile(path.join(__dirname + '/index.html'));
});


//Querying DB for Materials that are Filtered
app.get('/materials', function(req, res) {
	//res.send('returning all materials');
	materials.getMaterials(req, res);
});

//Querying DB for a specific material ID to return properties for
app.get('/materials/:id', function(req, res) {
	materials.getMaterial(req, res);
});



//Adding Material to DB
app.post('/materials/', function(req, res){
	materials.addMaterial(req.asJSON(), res);

});


//starts the server listening
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
    materials.initialize();	
});