var myApp = angular.module('myApp', ['mp.colorPicker']);

var base_query = "http://localhost:9995/materials";
var filtered_query = "";      

var scope_struct = {
	technology: "FDM", 
	composition: "PLA", 
	filament_diameter: "1.75", 
	color: "",
	opacity: "1",                           //opacity is broken for some reason
	manufacturer: "", 
	cost: "",
	tags: "",
	bed_material: "",
	temp_bed: "",
	min_nozzle_diameter: ""
};


myApp.controller('userCtrl', ['$scope', '$http', function($scope,$http) {

	$scope.server_response = "Available Materials: ";

  //initialize values to these settings
  $scope.technology = "FDM";
  $scope.composition = "PLA";
  $scope.filament_diameter = "1.75";
  $scope.color = ""; 
  $scope.opacity = "1";                   

  //non-initialized settings values:
  $scope.manufacturer = "";
  $scope.cost = "";
  $scope.tags = "";
  $scope.bed_material = "";
  $scope.temp_bed = "";
  $scope.min_nozzle_diameter = "";
  $scope.temp_extrude_default = "";

  //initialize the first query to send out with the presets
 	generateFullQuery(scope_struct);


  //USER CONFIGURATION CHANGE DETECTION
  $scope.changeTechnology = function(technology) {
    $scope.technology = technology;
    scope_struct.technology = technology; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeComposition = function(composition) {
    $scope.composition = composition;  //assigning last to preserve old value
    scope_struct.composition = composition; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeFilamentDiameter = function(filament_diameter) {
    $scope.filament_diameter = filament_diameter;
    scope_struct.filament_diameter = filament_diameter; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeManufacturer = function(manufacturer) {
    $scope.manufacturer = manufacturer;
    scope_struct.manufacturer = manufacturer; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeCost = function(cost) {
    $scope.cost = cost;
    scope_struct.cost = cost; //update the scope_struct
    generateFullQuery(scope_struct);
  };

 
  $scope.changeColor = function(color_temp) {
  	var color_parsed = color_temp.substring(1);
    
    $scope.color = color_parsed;
    scope_struct.color = color_parsed; //update the scope_struct
    generateFullQuery(scope_struct);
  };


  $scope.disableColorFiltering = function(){
    $scope.color = "";
    scope_struct.color = ""; //update the scope_struct
    generateFullQuery(scope_struct);
  };


  $scope.changeOpacity = function(opacity) {
    $scope.opacity = opacity;
    scope_struct.opacity = opacity; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeTags = function(tags) {
    $scope.tags = tags;
    scope_struct.tags = tags; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeBedMtl = function(opacity) {
    $scope.bed_material = bed_material;
    scope_struct.bed_material = bed_material; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeBedTemp = function(temp_bed) {
    $scope.temp_bed = temp_bed;
    scope_struct.temp_bed = temp_bed; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeNozzleDiameter = function(min_nozzle_diameter) {
    $scope.min_nozzle_diameter = min_nozzle_diameter;
    scope_struct.min_nozzle_diameter = min_nozzle_diameter; //update the scope_struct
    generateFullQuery(scope_struct);
  };

  $scope.changeTempExtrudeDefault = function(temp_extrude_default) {
    $scope.temp_extrude_default = temp_extrude_default;
    scope_struct.temp_extrude_default = temp_extrude_default; //update the scope_struct
    generateFullQuery(scope_struct);
  };

	//for each value in the component,value array, run generate query
	function generateFullQuery(obj){
		
		filtered_query = base_query;

		for (var key in obj) {
		  generateQueryItem(key, obj[key]);    //component = key; value = obj[key]
		}

		getQuery(filtered_query);
	}


	function generateQueryItem(component, value){
	  component = component.toString();               //make sure value is made into a string
	  value = value.toString();                       //make sure value is made into a string
	  
	  if(value!=""){              										//the user has entered content in filter
	    if(filtered_query.indexOf('?')>-1){  					//if there already is a filter in place
	      filtered_query = filtered_query + "&" + component + "=" + value;
	    }
	    else{
	      filtered_query = filtered_query + "?" + component + "=" + value;
	    }
	  }

	  else {                      										//the user is trying to remove content in filter
	    if(filtered_query.indexOf('&')>-1){  					//if there is more than one filter in place      
	      filtered_query = filtered_query.replace("&" + component + "=", "");

	    }
	    else{
	      filtered_query = filtered_query.replace("?" + component + "=", "");
	    }
	  }
	}


	function getQuery(address){

	  //alert("new query is: " + filtered_query);

		// Simple GET request example:
		$http({
		  method: 'GET',
		  url: address,
		  config: "",
			}).then(function success(response) {
			    styleResponse(response);
			  }, function error(response) {
			    alert("there was an error with your request");
			});
		}


	function styleResponse(response) {  //takes the response from server and styles

		//$scope.server_response = "<a href='google.com' class='button'>Go to Google</a>";

		$scope.server_response = JSON.stringify(response.data, null, 2);

	}

}]);







