$(document).ready(function() {
	// Tableaux
	$("table.tablesorter").tablesorter({
		textExtraction: function(node) {
			var attr = jQuery(node).attr('rel');
			return (typeof attr !== 'undefined' && attr !== false) ? attr : jQuery(node).text(); 
		}
	});
});