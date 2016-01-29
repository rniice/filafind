var Crawler = require("crawler")
    , url = require('url')
    , _ = require('lodash')
    , fs = require('fs');


//crawler settings

//exclude urls with any component that contains these strings
var exclusion_list_items = ['wiki','google','amazon','ebay', 'reprap','youtube','twitter'
                            ,'instagram','vimeo','github','facebook','google','linkedin'
                            ,'youtube'];


var filename_out = 'output';


//NEED TO BETTER FILTER OUT CANDIDATE URLS TO ADD, CONSIDER INCLUSION KEYWORDS:

//start filtering which urls get appended by checking for:
//filament, plastic, spool, feedstock, etc.

var cumulative_result = [];


//write out the cumulative_result to file every 20 seconds
var interval = setInterval(function() {
    writeResults(cumulative_result, filename_out);
    cumulative_result = [];     //clear the data in cumulative_result so it doesn't eat up all memory
}, 2000);


var c = new Crawler({
    maxConnections : 10,        //size of worker pool (default = 10)
    
    
    priorityRange: 10,               //range of acceptable priorities
    priority : 5,                //priority of this request (default is 5)
    retries:  3,                 //number of retries (default = 3)
    jQuery: true,               //default is true...or cheerio or jsdom
    
    /*
    jQuery: 'cheerio',
    jQuery: {
        name: 'cheerio',
        options: {
            normalizeWhitespace: true,
            xmlMode: true
        }

    },
    jQuery: { //using htmlparser2 options https://github.com/fb55/htmlparser2/wiki/Parser-options; 
        name: 'cheerio',
        options: {
            normalizeWhitespace: false,
            xmlMode: false,
            decodeEntities: true
        }
    }
    */

    forceUTF8: false,           //detect page charset and convert to UTF8 if needed (default = false)
    cache: true,                //store requests in memory (default is false)
    skipDuplicates: true,       //if true skips URIS that were already crawled  without running callback (default = false)
    rateLimits: 0,              //number of ms to delay between each request (this option will force crawler to use only one connection for now)
    

    // This will be called for each crawled page
    callback : function (error, result, $) {
        var current_url = this.uri;
        console.log("the current url is: " + current_url);
        //if want to do ascending search, check the header for links to referring websites
        try {

            //search only body element of each website, skip headers
            $('body').each(function(index) {
                console.log("running index: " + index);

                var buy_now = [],
                    name = [],
                    technology = [],
                    composition = [],
                    diameter = [],
                    filament_extrusion_to_flow_multiplier = [],
                    color = [],
                    opacity = [],
                    manufacturer = [],
                    price = [],
                    weight = [],
                    tags = [],
                    bed_material = [],
                    bed_temp = [],
                    min_nozzle_diameter = [],
                    temp_extrude_default = [],
                    temp_extrude_min = [],
                    temp_extrude_max = [],
                    website = [],
                    extruder_fan_speed = [];


                $('a.product_img_link').each(function(index, a) {            //search for additional links
                    var composition_regex = new RegExp('^[3][D][F][M][\s]([\w]+)', 'ig');

                    console.log("index is: " + index);

                    buy_now[index] = $(a).attr('href');
                    name[index] = $(a).attr('title');
                    technology[index] = "FDM";
                    website[index] = "http://3dfilamenta.com/";

                    filament_extrusion_to_flow_multiplier[index] = 1.00;

                    composition[index] = name[index].match(composition_regex);
                    diameter[index] = 1.75;
                    color[index] = null;
                    opacity[index] = 1;
                    manufacturer[index] = "3DFilamenta";
                    weight[index] = 1.0;
                    tags[index] = null;
                    min_nozzle_diameter[index] = '';
                    
                    if(name[index].match('ABS')){
                        temp_extrude_default[index] = 230;
                        temp_extrude_min[index] = 200;
                        temp_extrude_max[index] = 250;
                        bed_temp[index] = 110;
                        bed_material[index] = 'kapton, abs slurry, acrylic, blue tape';
                        extruder_fan_speed[index] = 0;
                    }
                    else {
                        temp_extrude_default[index] = 200;
                        temp_extrude_min[index] = 190;
                        temp_extrude_max[index] = 210;
                        bed_temp[index] = 60;
                        bed_material[index] = "blue tape, glass, glue stick";
                        extruder_fan_speed[index] = 255;
                    }
                });

                $('span.price.product-price').each(function(index, span) { 
                    price[index] = String($(span).text()).replace('\t','');
                });
                

                //combine all the results into a json format
                for (var i = 0; i < name.length; i++){
                    var item_to_push = {   
                        name: name[i],
                        technology : technology[i],
                        composition : composition[i],
                        price : price[i],
                        manufacturer : manufacturer[i],
                        website: website[i],                                           //set at beginning of callback from c.object
                        color : color[i],
                        opacity : opacity[i],                        
                        tags : tags[i],
                        diameter : diameter[i],
                        filament_extrusion_to_flow_multiplier : filament_extrusion_to_flow_multiplier[i],
                        temp_extrude_default : temp_extrude_default[i],
                        temp_extrude_min : temp_extrude_min[i],
                        temp_extrude_max : temp_extrude_max[i],
                        bed_temp : bed_temp[i],
                        min_nozzle_diameter : min_nozzle_diameter[i],
                        extruder_fan_speed : extruder_fan_speed[i],
                        //weight : weight,
                        bed_material : bed_material[i],
                        buy_now : buy_now[i]
                    };

                    //console.log(item_to_push);

                    cumulative_result.push(item_to_push);
                }

            });
        }
        catch(err){
            console.log("the error is: " + err);
        }


    },                              //end of primary callback function

    onDrain : function() {          //when there are no more queued requests
        console.log("crawling has completed no more requests");
        clearInterval(interval);
        writeResults(cumulative_result, filename_out);
    }
});

// Queue a list of URLs, with default callback
c.queue(["http://3dfilamenta.com/18-3d-printer-filaments?id_category=18&n=60"]);

function acceptURL(url, exclusion_items) {
    //console.log("url is: ");
    //console.log("exlusion items are: " + exclusion_items);

    for (var i =0; i < exclusion_items.length; i++) {
        var regex = new RegExp(exclusion_items[i],"i");
        var matches = url.match(regex);

        if(matches) {              //case insensitive regeX i,
            return false;
        }

    }

    return true;
}


function findValueFromKey(search_string, key) {
    var values = [];        //array of all the values found for the keys specified

    for (var i =0; i < key.length; i++) {
        var regex = new RegExp(key[i],"ig");                    //ig would find all matches in the element, not just the first
        var matches = search_string.match(regex);

        if(matches) {              //case insensitive regeX i,
            //console.log("found results for: " + key);
            
            if (search_string.match(RegExp('{{}}','ig'))  == true) {
                //console.log("price data embedded in angular {{");
                values.push("found: " + matches + " in: " + "angular braces");
            }

            else{
                values.push("found: " + matches + " in: " + search_string);
            }
        }

        else {
            //console.log("no data found here");
        }

    }

    return values;

}


function processContents() {

    var processed_result = null;

    return processed_result;
}


function compareContents() {        //make decisions on the correct values based on what is found


}


function writeResults(data, output_filename){
    console.log("appending data to file");

    fs.appendFile(output_filename + ".json", JSON.stringify(data, null, 2), function(err) {
      if (err) {
        return console.log(err);
      }
      else {
        console.log('The "data to append" was appended to file!');
      }
    });

    /*
    fs.writeFile("./results/" + output_filename + ".txt", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
*/

}



// Queue using a function

/*
var googleSearch = function(search) {
  return 'http://www.google.fr/search?q=' + search;
};
c.queue({
  uri: googleSearch('3D Printer Filament')
});
*/


// Queue some HTML code directly without grabbing (mostly for tests)

//c.queue(['C:/Users/Mike/code/node-crawler/tests/makerbot_page.html']);


