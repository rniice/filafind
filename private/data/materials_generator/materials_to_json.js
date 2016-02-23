var fs = require("fs"),
node_xj = require("xls-to-json"),
input_file = "Materials_V1.xls",
output_file = null,
output_sheet_fdm = "FDM_export",
output_sheet_dlp = "DLP_export",
output_file_nice = "../materials.json";
index_first_empty_object = 0;	//initialize to zero

var json_data_slice_fdm,   //make these values available globally
json_data_slice_dlp;	   //make these values available globally

node_xj({
	input: input_file,  		// input xls
	output: output_file, 		// output json
	sheet: output_sheet_fdm,  	// specific sheetname
	}, function(err, json_data) {
		if(err) {
		  console.error(err);
		} else {
			for (var i = 0; i < json_data.length; i++) {
//				if (json_data[i].is_user == "") {
				if (json_data[i].id == "") {
					index_first_empty_object = i;
					break;
				}
				else {
					delete json_data[i][""];  //remove any instances of blank key
					delete json_data[i]["id_seq"];  //remove any instances sequential id reference
					json_data[i]["tags"]=json_data[i]["tags"].split(","); //break up any strings with commas into an array.
					//json_data[i]["printer_types"]=json_data[i]["printer_types"].split(","); //break up any strings with commas into an array.
					//json_data[i]["id"]=parseInt(json_data[i]["id"],10);
					json_data[i]["version"]=parseInt(json_data[i]["version"],10);
					json_data[i]["cost"]=parseFloat(json_data[i]["cost"]);		
					json_data[i]["opacity"]=parseInt(json_data[i]["opacity"],10);	
					//json_data[i]["rating"]=parseFloat(json_data[i]["rating"]);	
					//json_data[i]["pct_shrink"]=parseFloat(json_data[i]["pct_shrink"]);	
					//json_data[i]["is_user"]=JSON.parse(json_data[i]["is_user"]);	//change to boolean
					json_data[i]["filament_diameter"]=parseFloat(json_data[i]["filament_diameter"]);	
					json_data[i]["filament_extrusion_to_flow_multiplier"]=parseFloat(json_data[i]["filament_extrusion_to_flow_multiplier"]);	
					json_data[i]["temp_extrude_default"]=parseFloat(json_data[i]["temp_extrude_default"]);	
					json_data[i]["temp_min_extrude"]=parseFloat(json_data[i]["temp_min_extrude"]);	
					json_data[i]["temp_max_extrude"]=parseFloat(json_data[i]["temp_max_extrude"]);	
					json_data[i]["temp_bed"]=parseFloat(json_data[i]["temp_bed"]);	
					json_data[i]["min_nozzle_diameter"]=parseFloat(json_data[i]["min_nozzle_diameter"]);	
					json_data[i]["extruder_fan_speed"]=parseInt(json_data[i]["extruder_fan_speed"],10);					
					//json_data[i]["color"]=parseInt(json_data[i]["color"],16);						
				}
			}

			json_data_slice_fdm = json_data.slice(0,index_first_empty_object);
		}
	}
);

/*
node_xj({
	input: input_file,  		// input xls
	output: output_file, 		// output json
	sheet: output_sheet_dlp,  	// specific sheetname
	}, function(err, json_data) {
		if(err) {
		  console.error(err);
		} else {
			for (var i = 0; i < json_data.length; i++) {
				if (json_data[i].is_user == "") {
					index_first_empty_object = i;
					break;
				}
				else {
					delete json_data[i][""];  //remove any instances of blank key
					delete json_data[i]["id_seq"];  //remove any instances sequential id reference
					json_data[i]["tags"]=json_data[i]["tags"].split(","); //break up any strings with commas into an array.
					//json_data[i]["printer_types"]=json_data[i]["printer_types"].split(","); //break up any strings with commas into an array.
					//json_data[i]["id"]=parseInt(json_data[i]["id"],10);
					json_data[i]["version"]=parseInt(json_data[i]["version"],10);
					json_data[i]["cost"]=parseFloat(json_data[i]["cost"]);
					json_data[i]["opacity"]=parseInt(json_data[i]["opacity"],10);		
					//json_data[i]["rating"]=parseFloat(json_data[i]["rating"]);	
					//json_data[i]["pct_shrink"]=parseFloat(json_data[i]["pct_shrink"]);	
					//json_data[i]["is_user"]=JSON.parse(json_data[i]["is_user"]);	//change to boolean
					json_data[i]["density [kg/L]"]=parseFloat(json_data[i]["density [kg/L]"]);					
					json_data[i]["FirstExposureSec"]=parseFloat(json_data[i]["FirstExposureSec"]);	
					json_data[i]["BurnInLayers"]=parseInt(json_data[i]["BurnInLayers"],10);	
					json_data[i]["BurnInExposureSec"]=parseFloat(json_data[i]["BurnInExposureSec"]);	
					json_data[i]["ModelExposureSec"]=parseFloat(json_data[i]["ModelExposureSec"]);					
					
					//delete all the other parameters that we don't necessarily need
					delete json_data[i]["FirstSeparationRPM"];  
					delete json_data[i]["FirstApproachRPM"];  
					delete json_data[i]["FirstZLiftMicrons"];  
					delete json_data[i]["FirstSeparationMicronsPerSec"];  
					delete json_data[i]["FirstApproachMicronsPerSec"];  
					delete json_data[i]["FirstRotationMilliDegrees"];  
					delete json_data[i]["FirstExposureWaitMS"];  
					delete json_data[i]["FirstSeparationWaitMS"];  
					delete json_data[i]["FirstApproachWaitMS"];  
					delete json_data[i]["BurnInSeparationRPM"];  
					delete json_data[i]["BurnInApproachRPM"];  
					delete json_data[i]["BurnInZLiftMicrons"];  
					delete json_data[i]["BurnInSeparationMicronsPerSec"];  
					delete json_data[i]["BurnInApproachMicronsPerSec"];  
					delete json_data[i]["BurnInRotationMilliDegrees"];  
					delete json_data[i]["BurnInExposureWaitMS"];  
					delete json_data[i]["BurnInSeparationWaitMS"];  
					delete json_data[i]["BurnInApproachWaitMS"];  
					delete json_data[i]["ModelSeparationRPM"];  
					delete json_data[i]["ModelApproachRPM"]; 
					delete json_data[i]["ModelZLiftMicrons"];  
					delete json_data[i]["ModelSeparationMicronsPerSec"];  
					delete json_data[i]["ModelApproachMicronsPerSec"];  
					delete json_data[i]["ModelRotationMilliDegrees"];   
					delete json_data[i]["ModelExposureWaitMS"];  
					delete json_data[i]["ModelSeparationWaitMS"];  
					delete json_data[i]["ModelApproachWaitMS"];   

					//json_data[i]["color"]=parseInt(json_data[i]["color"],16);						
				}
			}
			json_data_slice_dlp = json_data.slice(0,index_first_empty_object);
		}
	}
);
*/


//combine all of of the different material slices using simple timeout
setTimeout(function(){
	//combine elements of two exported files then write to file.
	//var combined_json = json_data_slice_fdm.concat(json_data_slice_dlp);
	var combined_json = json_data_slice_fdm;
	combined_json = JSON.stringify(combined_json, null, 4).toString();
	combined_json = "{ \"materials\" : " + combined_json + "}" ;

	fs.writeFile(output_file_nice,combined_json, function(err) { 
		if(err) {
			console.log(err);
		}
		else {
			console.log("the made nice file was saved!");
		}
	});
},1500);
