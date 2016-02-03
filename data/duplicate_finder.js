var fs = require('fs');
var _ = require('underscore');

var json_data = require('./materials.json');


json_data = json_data.materials; //just take the materials list names
var difference = [];			 //array to store the redundant json objects
var difference_names = [];		 //array to store the redundant names


var unique_json_data = _.uniq(
							json_data, 
							false, 
							function(item){ 
								return item.name; 
							});

console.log("length of json_data:        " + json_data.length);
console.log("length of unique_json_data: " + unique_json_data.length);

//compare the two json files to find which are the duplicates
difference = _.difference(json_data, unique_json_data);

//extract the names from the difference json array:
for (var i = 0; i < difference.length; i++) {
	difference_names.push(difference[i].name + "\n");
}

console.log("the redundant name values are: \n" + difference_names);


