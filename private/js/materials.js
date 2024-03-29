/*
Spark3dp/print-manager

Copyright 2015 Autodesk, Inc.

Licensed under the Apache License, Version 2.0 (the “License”.
You may not use this file except in compliance with the  License,
a copy of which can be obtained at:

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the  License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied,
including, without limitation, any warranties or conditions of TITLE,
NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE..
See the  License for the specific language governing permissions and
limitations under the  License.
*/


var express = require( 'express'),
    path = require('path'),
    _ = require('underscore'),
    url = require('url'),
    config = require('../config.json');
    //materials = require('../../private/data/materials.json');


var router = null;						//initialize the router object
var materials = {};						//initialize the materials object
var materials_user = {};                //initialize the user's materials object


function initialize() {
    console.log(process.cwd());
    var dir = process.cwd() + config.material_data_files,
        data = require(path.join(dir, 'materials.json'));

    console.log('materials database initialized from: \n', dir);
    materials = data.materials;     //populate the materials object
    
    data.materials.forEach(function (material) {
    	if(material.is_user===true) {
            materials_user.push(material);  //copy any user materials into a separate location
    	}
    });
}


function getfilteredMaterials(filter) { //?technology=FDM&temp_max_extrude=250
    var materials_temp = materials;
    var keysToParseAsFloat = ['version', 'opacity', 'rating', 'pct_shrink',
        'filament_diameter', 'filament_extrusion_to_flow_multiplier', 'temp_min_extrude',
        'temp_max_extrude', 'extruder_fan_speed', 'FirstExposureSec', 'BurnInLayers', 
        'BurnInExposureSec', 'ModelExposureSec', 'density'
    ];

    //removed 'temp_bed' and 'min_nozzle_diameter' from keysToParseAsFloat


    for (var key in filter) {
        if (!filter.hasOwnProperty(key)) {
            continue;
        }


        if (keysToParseAsFloat.indexOf(key) !== -1) {
            if (!isNaN(parseFloat(filter[key]))) {    //if can be parsed into a float value
                filter[key] = parseFloat(filter[key]);
            }
        }
        else if (key === "cost") { //returns only minValue < cost < maxValue
            (function() {
                var cost_parts = filter[key].split(',');

                var cost_min = parseFloat(cost_parts[0]);
                var cost_max = parseFloat(cost_parts[1]);
                var valid_cost_value = parseFloat(cost_parts[0]);

                //removes anything exceeding user param cost from list of materials_temp copied from materials
                materials_temp = materials_temp.filter(function(material_item) {
                    return valid_cost_value && (material_item["cost"] <= cost_max) && (material_item["cost"] >= cost_min);
                });
            })();

            delete filter[key];  //delete the filter and key associated so that _.where functionality is not rendered useless
        } 
        else if (key === "temp_bed") { //returns only temp_bed < param
            (function() {
                var tolerance = 20.0;
                var temp_threshold = parseFloat(filter[key]);
                var valid_temp_value = parseFloat(filter[key]);

                //removes anything exceeding user param cost from list of materials_temp copied from materials
                materials_temp = materials_temp.filter(function(material_item) {
                    if( (temp_threshold <= 60) && (material_item["temp_bed"] <=80) ) {
                        return true;
                    }
                    else if ( (temp_threshold - tolerance <= material_item["temp_bed"] ) && (material_item["temp_bed"] <= temp_threshold + tolerance) ) {  
                        return true;
                    }
                    else{
                        return false;
                    }
                });
            })();

            delete filter[key];  //delete the filter and key associated so that _.where functionality is not rendered useless
        } 
        else if (key === "temp_extrude_default") { //returns only temp_extrude_default < param
            (function() {
                var tolerance = 20.0;
                var temp_threshold = parseFloat(filter[key]);
                var valid_temp_value = parseFloat(filter[key]);

                //removes anthing exceeding user param cost from list of materials_temp copied from materials
                materials_temp = materials_temp.filter(function(material_item) {
                    if ( (temp_threshold - tolerance <= material_item["temp_extrude_default"] ) && (material_item["temp_extrude_default"] <= temp_threshold + tolerance) ) {  
                        return true;
                    }
                    else{
                        return false;
                    }                  
                });
            })();

            delete filter[key];  //delete the filter and key associated so that _.where functionality is not rendered useless
        } 
        else if (key === "min_nozzle_diameter") { //returns only min_nozzle_diameter < param
            (function() {
                var diam_threshold = parseFloat(filter[key]);
                var diam_temp_value = parseFloat(filter[key]);

                //removes anything exceeding user param cost from list of materials_temp copied from materials
                materials_temp = materials_temp.filter(function(material_item) {
                    if( (diam_threshold =="") || (material_item["min_nozzle_diameter"]==0) ) {
                        return true;
                    }
                    else if (material_item["min_nozzle_diameter"] <= diam_threshold) {
                        //return valid_temp_value && (material_item["temp_bed"] <= temp_threshold);
                        //return (material_item["temp_bed"] <= temp_threshold);
                        return true;
                    }
                    else{
                        return false;
                    }
                });
            })();

            delete filter[key];  //delete the filter and key associated so that _.where functionality is not rendered useless
        } 
        else if (key === "color") { //returns only colors within tolerance
            (function() {
                var rgb_object = hexToRgb(filter[key]),
                    red_val = rgb_object.r,
                    green_val = rgb_object.g,
                    blue_val = rgb_object.b,
                    color_tol = 50;       //tweak as necessary

                //removes anthing out of allowable color range from list of materials_temp copied from materials
                materials_temp = materials_temp.filter(function(material_item) {
                    var color = hexToRgb(material_item["color"]);

                    return (Math.abs(red_val - color.r) <= color_tol) &&
                        (Math.abs(green_val - color.g) <= color_tol) &&
                        (Math.abs(blue_val - color.b) <= color_tol);
                });
            })();

            delete filter[key];  //delete the filter and key associated so that _.where functionality is not rendered useless
        }
        else if (key === "tags") { //returns only tags within value
            (function() {
                var selected_tag = filter[key];
                //console.log("selected tag is: " + selected_tag);

                materials_temp = materials_temp.filter(function(material_item) {
                    if(material_item["tags"].indexOf(selected_tag) > -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

            })();

            delete filter[key];  //delete the filter and key associated so that _.where functionality is not rendered useless
        }
        else if (key === "bed_material") { //returns only tags within value
            (function() {
                var selected_bed_material = filter[key];
                //console.log("selected bed_material is: " + selected_bed_material);
                //removes anything exceeding user param cost from list of materials_temp copied from materials
                materials_temp = materials_temp.filter(function(material_item) {
                    //console.log(material_item["bed_material"]);
                    //console.log(material_item["id"]);

                    if(material_item["bed_material"].indexOf(selected_bed_material) > -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

            })();

            delete filter[key];  //delete the filter and key associated so that _.where functionality is not rendered useless
        }
        else if (key === "location") { //returns only tags within value
            (function() {
                var selected_location = filter[key];
                //console.log("selected bed_material is: " + selected_bed_material);
                //removes anything exceeding user param cost from list of materials_temp copied from materials
                materials_temp = materials_temp.filter(function(material_item) {
                    //console.log(material_item["bed_material"]);
                    //console.log(material_item["id"]);

                    if(material_item["location"].indexOf(selected_location) > -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });

            })();

            delete filter[key];  //delete the filter and key associated so that _.where functionality is not rendered useless
        }

    }
    return _.where(materials_temp, filter);
}


function getMaterials( req, res )
{
    var query = url.parse(req.url,true).query;  
    //console.log("query is: ", query);
    //console.log("received request");

    if(_.isEmpty(query)) {                             //if no query passed, return all
        var result = materials.sort(sortByProperty('cost')).slice(0,12);  //return only 12 sorted by cost
        result = mangleJSON(result);
        //console.log(result);

        res.status(200);
        res.send(result);
    }

    else {
        var result = getfilteredMaterials(query);      //if query passed, run filter
        
        result = result.sort(sortByProperty('cost')).slice(0,12);  //return only 12 sorted by cost
        result = mangleJSON(result);
        //console.log(result);

        res.status(200);
        res.send(result);
    }

}


function addMaterial(data) {
    console.log('postMaterial, data: ' + data);

    var id = data.id,
        result = {};

    if( !id )
    {
        result.success = false;
        result.code = 400;
        result.msg = 'No ID specified for the Material';
    }

    else if (!data.printer_types){
        result.success = false;
        result.code = 400;
        result.msg = 'No printer types specified for the Material';
    }

    else if( findMaterial(id) )
    {
        result.success = false;
        result.code = 400;
        result.msg = 'Material already exists: ' + id;
    }

    else
    {
        var type = new Material( data );

        result.success = true;
        result.code = 204;
    }

    return result;
}


function postMaterial( req, res )
{
    var result = addMaterial(req.body);
    if (result.success) {
        res.status(result.code);
        res.send();
    } 
    else {
        sendError(res, result.code, result.msg);
    }
}

function findMaterial( id ) {
    var result = getfilteredMaterials({'id': id});
    /*
    if (!(typeof(id) === 'string' || id instanceof String)) {
        return undefined;
    }

    else {
        var result = _.find(materials, function(num){
            return num.id == id;
        });
        return result;
    }
    */

    //return materials.hasOwnProperty('id') ? materials[id] : undefined;
    return result;

}

function getMaterial( req, res )
{
    var id = req.params.id;
    var type = findMaterial ( id );  //this returns all material properties associated with this ID

    if( type )
    {
        console.log("in the type field");
        res.send( type.asJSON() );
    }

    else
    {
        res.status( 404 );
        var msg = 'Material not found: ' + id;
        console.log( msg );
        res.send( msg );
    }
}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}


function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function sortByProperty(property) {
    'use strict';
    return function (a, b) {
        var sortStatus = 0;
        if (a[property] < b[property]) {
            sortStatus = -1;
        } else if (a[property] > b[property]) {
            sortStatus = 1;
        }
        else {
            return 0;
        }
 
        return sortStatus;
    };
}


function mangleJSON(data_json) {
    var data_json_mangled;
    //var encoding = "base64";
    //var encoding = "utf-8";

    //create a buffer using data_json with specified encoding
    //var buf = new Buffer(JSON.stringify(data_json), encoding);
    //var buf = JSON.stringify(data_json);
    //data_json_mangled = buf;
    data_json_mangled = data_json;

    //then reverse the result
    return data_json_mangled;
}


module.exports = exports = {
    'initialize' : initialize,
    'getMaterial' : getMaterial,
    'getMaterials' : getMaterials,
    'findMaterial' : findMaterial,
    //'getAllMaterials' : getAllMaterials,
	//'Router' : getRouter,
    'find' : findMaterial,
    'addMaterial' : addMaterial
};


//include a function that creates UUIDs

//include a function to copy files to filesystem/append to user json file