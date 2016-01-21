var express = require('express');
var http = require('http');
var app = express();
var fs = require('fs');

var config = require('./js/config.json');
var materials = require('./js/materials.js');


app.listen(config.PORT, function() {        //listen to requests from the local host. 
	console.log("listening on localhost port: ", config.PORT);

	materials.initialize();					//initialize the materials database

});	


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
	//res.send('returning specific material id');
	materials.getMaterial(req, res);
});

/*
app.get('/materials/find', function(req, res) {
	var result = materials.findMaterial(req, res);
	res.status(200);
	res.send(result);
});
*/

//Adding Material to DB
app.post('./materials/', function(req, res){
	materials.addMaterial(req.asJSON(), res);

});


