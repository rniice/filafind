
var A; /* Cross sectional Area of filament (cm2). Round to 3 d.p. for calculating Volume to nearest cm3. */
var W; /* Weight per unit length (g/m). */
var x; /* Format of material- [M]etered, [C]oil, [S]pool */

var cost;


var diameter; /*  */
var plastic; /*  */

var q; /* Product quantity - amount of items selected */
var volume;
var total;
var volume_deets;

var originalcostdisplay;
var price_check;



jQuery(document).ready(function($) {


	$('p.pricedisplay').append(' per unit');


	function producttype(dropdownvalue){
	/* Determine format of material from 'Plastic Type' product variation.
	 * This relies on the product variation text containing keywords '1m', 'coil' or 'spool'.
	 * @return: x = [M]etered, [C]oil, [S]pool
	 * @since: 	12.11.14
	 * @todo: 	Function also defaults minimum order quantities. This should be handled in core.
	 */
		x = 0;
		if(dropdownvalue.indexOf('1m') > 0) {
	      	x = 'M' ; // Material format is Metered
	      	$('input[name$="wpsc_quantity_update"]').val(10); // Set MOQ = 10m
	    } else if (dropdownvalue.indexOf('coil') > 0) {
	    	x = 'C' ; // Material format is Coil
	      	$('input[name$="wpsc_quantity_update"]').val(1); // Set MOQ = 1pc
	    } else if (dropdownvalue.indexOf('spool') > 0) {
	    	x = 'S'; // Material format is Spool
	      	$('input[name$="wpsc_quantity_update"]').val(1); // Set MOQ = 1pc
	    }
	}

	function material_properties(diameter){
	/* Determine diameter of material from 'Plastic Type' product variation
	 * @return: A= area, W =weight
	 * @since: 	12.11.14
	 */
		switch(diameter)
		{
			case '2.85': 
				A = 0.064; // Diameter = 2.85mm, A = 0.064cm2 3d.p.
				W = 8.4; // Weight = 8.4 g per meter
			break;
			case '3': 
				A = 0.064; // Diameter = 2.85mm, A = 0.064cm2 3d.p.
				W = 8.4; // Weight = 8.4 g per meter
			break;
			case '1.75': 
				A = 0.024; // Diameter = 1.75mm, A = 0.024cm2 3d.p.
				W = 3.1; // Weight = 3.1 g per meter
			break;
			default: diameter = '-- Please Select --';
		}

	}


	function update_volume_length() {

		cost = $('.currentprice').text().replace('£', '');

		q = $('.wpsc_quantity_update').find('input').val();
		
		var child = $('p.pricedisplay').children('span').clone().wrap('<p>').parent().html();

		$('p.pricedisplay').html('Price: ' + child);

			if (x === 'C') {
				$('p.pricedisplay').append(' per unit');
				volume = (q*100*A*100);
				volume_deets = (q*100) + ' meters is about ' + (W*q*100).toFixed(0) +'g or '+ volume.toFixed(0) +'cc';
			}else if (x === 'M') {
				$('p.pricedisplay').append(' per meter');
				volume = (q*100*A);
				volume_deets = q + ' meters is about ' + (W*q).toFixed(0) +'g or '+ volume.toFixed(0) +'cc';
			}else if (x === 'S') {
				$('p.pricedisplay').append(' per unit');
				volume = (q*100*A);
				volume_deets = ''; //THIS IS THE SPOOL TEXT
			}

			total = (q*cost);
			$('#volume_details').text(volume_deets);
			$('#total_details h3').text('Total: £' + total.toFixed(2));
	}


	function price_change(){

		if (originalcostdisplay !== $('.currentprice').text()) {
			
			clearInterval(price_check);

			diameter = $('.diameter option:selected').text().replace('mm', '');

			producttype($('.plastictype option:selected').text());
		 
			material_properties(diameter);

			update_volume_length();
			originalcostdisplay = $('.currentprice').text();	
		}
	}

	
	// Determine if current product selected is sold by the meter
	$('.plastictype').val('81');
	producttype($('.plastictype option:selected').text());

	 diameter = $('.diameter option:selected').text();
	 plastic = $('.plastictype  option:selected').text();
	 q = $('.wpsc_quantity_update').find('input').val();
	 originalcostdisplay = $('.currentprice').text();
 
	$('input[name=wpsc_quantity_update]').keyup(function() {  
		if(diameter !== '-- Please Select --'){
	  		update_volume_length();
	  	}
	});
 
	$('.wpsc_select_variation').change(function() { 
		price_check = setInterval(price_change, 500);
	});



	$('.wpsc_buy_button').live('click',function(event){
			
		if (x === 'M'){
			
			if ($(".wpsc_quantity_update").find("input").val() < 5){
				event.preventDefault();
				alert("Oops, the minimum length order is 5m.");
			}
			else if ($(".wpsc_quantity_update").find("input").val() > 100){
				var quantity_over = $(".wpsc_quantity_update").find("input").val();
				var remainder = quantity_over % 100;
				var coil_num = (quantity_over - remainder)/100;
			 	alert ("Sorry our maximum length is 100m.\r\nYou should order "+ coil_num + " x 100m coils and " + remainder +" meters.\r\nWe’ve put "+remainder+" meters in the quantity box for you!");
				
				$('.wpsc_quantity_update').find('input').val(remainder);

				update_volume_length();
			
			}else  if ($('.wpsc_quantity_update').find('input').val() > 85 ){
				
				alert("Hello! If you’re ordering over 85m it’s cheaper to buy a 100m coil.");
			}
		}
		
		
	});
		
	
});