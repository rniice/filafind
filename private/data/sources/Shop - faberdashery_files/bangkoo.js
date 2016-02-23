jQuery(document).ready(function($){
						   
	// TOP NAVIGATION MENU 
	$("#top-menu > li.menu-item, #top-menu > li.menu-item > ul.sub-menu > li.menu-item").hover(
	function(){
		$(this).addClass("hovered");
		$(this).find("> .sub-menu").animate({height: 'toggle'}, 100);
	},
	function(){
		$(this).removeClass("hovered");
		$(this).find(".sub-menu").hide(0);
	});
	
	// DISSOLVED INPUT MENU
	var inputs = $('p.dissolve > input.disinput');
	inputs.val('');
	$(inputs).focus(function() {
		var vals = $(this).val();
		var fors = $(this).attr("id");
		var labels = $("p.dissolve > label.dislabel[for="+fors+"]");
		if (vals == "") {
			$(labels).animate({opacity: 0}, 200);
		}
	});
	$(inputs).blur(function() {
		var vals = $(this).val();
		var fors = $(this).attr('id');
		var labels = $("p.dissolve > label.dislabel[for="+fors+"]");
		if (vals == "") {
			$(labels).animate({opacity: 1}, 200);
		}
	});
	
	// IN PAGE TABS
	$("#browse-tab li, .tabbed-tabs li, #step2form-tabs li, .browse-pane ul li").hover(function(){$(this).addClass("hovered")},function(){$(this).removeClass("hovered")});
	$("ul#browse-tab").tabs("div#browse-panes > div.browse-pane");
	$("ul.tabbed-tabs").tabs("div.tabbed-panes > div.tabbed-pane");
	
	// STICKY FOOTER
	var footHeight = $("#footer").height();
	var mainPadding = footHeight + 20 +"px";
	var footMargin = footHeight+"px";
	$("#main").css("padding-bottom", mainPadding);
	$("#footer").css("margin-top", "-"+footMargin);
	
	// EQUAL HEIGHTS
	function equalHeight(group) {
		var tallest = 0;
		group.each(function() {
			var thisHeight = $(this).height();
			if(thisHeight > tallest) {
				tallest = thisHeight;
			}
		});
		group.height(tallest);
	}	
	equalHeight($(".product-small-desc"));
	equalHeight($(".tabbed-pane"));	
	equalHeight($(".post-status > div"));
	equalHeight($(".log-forms form"));
	
	// COMMENTS
	$(".comment .children li:last-child").addClass("last");	
});
