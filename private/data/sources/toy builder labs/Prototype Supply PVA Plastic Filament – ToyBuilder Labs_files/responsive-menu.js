var adjustMenu = function() {
	function detectmob() { 
		if( navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		){
			return true;
		}
		else {
			return false;
		}
	}

	if (ww <= 768) {
		jQuery(".toggleMenu").css("display", "inline-block").removeClass("isDesktop").addClass("isMobile");
		if (!jQuery(".toggleMenu").hasClass("active")) {
			jQuery(".responsiveMenu").hide().removeClass("isDesktop").addClass("isMobile");
		} else {
			jQuery(".responsiveMenu").show().removeClass("isDesktop").addClass("isMobile");
		}
		jQuery(".responsiveMenu li").unbind('mouseenter mouseleave');
		jQuery(".responsiveMenu li a.parent").unbind('click').bind('click', function(e) {
			e.preventDefault();
          	jQuery(this).parent("li").toggleClass("hover").siblings().removeClass("hover");
		});
	} 
	else if (ww > 768) {
		jQuery(".toggleMenu").css("display", "none").removeClass("isMobile").addClass("isDesktop");
		jQuery(".responsiveMenu").show().removeClass("isMobile").addClass("isDesktop");
		jQuery(".responsiveMenu li").removeClass("hover");
		jQuery(".responsiveMenu li a").unbind('click');
		jQuery(".responsiveMenu li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	jQuery(this).toggleClass('hover');			
		});
		if(detectmob()){
			jQuery(".responsiveMenu li.parent > a").click(function(e){
				e.preventDefault();
			})
		}
	}
}

var ww = screen.width;//jQuery(window).width();
jQuery(document).ready(function() {
	jQuery(".responsiveMenu li a").each(function() {
		if (jQuery(this).next().length > 0) {
			jQuery(this).addClass("parent");
		};
	})
	
	jQuery(".toggleMenu").click(function(e) {
		e.preventDefault();
		if(!jQuery(this).hasClass("active")){
		jQuery(".toggleMenu").removeClass("active");
		jQuery(".responsiveMenu").hide();
		}
		jQuery(this).toggleClass("active");
		jQuery(this).next(".responsiveMenu").toggle();

	});
	ww = document.body.clientWidth;
	adjustMenu();
})

jQuery(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});
