var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var fs = require('fs');

var config = require('./private/config.json');
var materials = require('./private/js/materials.js');


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
var public_directory = path.join(__dirname, "public")

app.use(express.static(public_directory));

//MAIN landing URL
app.get('/', function(req, res) {
	//console.log("operating in dirname: " + __dirname);
	res.sendFile(path.join(public_directory + '/index.html'));
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

//respond with facebook og open graph image
app.get('/img', function(req, res) {
	//console.log("operating in dirname: " + __dirname);
	res.sendFile(path.join(public_directory + '/img/og_image.jpg'));
});

app.get('/howto', function(req, res) {
	res.sendFile(path.join(public_directory + '/html/howto.html'));
});

app.get('/about', function(req, res) {
	res.sendFile(path.join(public_directory + '/html/about.html'));
});

app.get('/suppliers', function(req, res) {
	res.sendFile(path.join(public_directory + '/html/suppliers.html'));
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
