$(document).ready(function() {
	
	// Disclaimer
	$("div#cookies-disclaimer-close").click(function() {
		var expiryDate = new Date();
  		expiryDate.setDate(expiryDate.getDate() + 5 * 365);
		var cookieVal = "hasVisited=1;expires="+expiryDate.toUTCString()+";path=/;domain="+$(this).attr("rel")+";";
		document.cookie = cookieVal;
		$(this).parent().remove();
	});
	function getCookie(w){
		var cName = "";
		var pCOOKIES = document.cookie.split(';');
		for (var bb = 0; bb < pCOOKIES.length; bb++) {
			var NmeVal = pCOOKIES[bb].split('=');
			if(NmeVal[0] == w) return true;
		}
		return false;
	}
	var cookieValue = getCookie(" hasVisited");
	if (cookieValue!=true) $("div#cookies-disclaimer").show();
  
  // Back to top
	$("div#footer a#back-to-top").click(function(e) {
			e.preventDefault();
			$('html, body').stop().animate({'scrollTop': 0}, 900, 'swing');
	});
	
	// Iframes & objects
	$("iframe, object").attr("wmode", "opaque");
	
	// GESTION TOPBAR
	// Scroll
	function checkScroll() {
		var scrollTop = $(document).scrollTop();
		var limit = 153;
		// Si on n'est pas en haut et que le header n'a pas la classe scrolled
		if (scrollTop>limit && !$("div#header").hasClass("scrolled")) {
			$("div#header-top").slideUp(200);
			$("div#header-menu").slideUp(200);
			$("div#header").addClass("scrolled");
		}
		// Si on est en haut et que le header a la classe scrolled)
		if (scrollTop<=limit && $("div#header").hasClass("scrolled")) {
			$("div#header-top").slideDown(50);
			$("div#header-menu").slideDown(50);
			$("div#header").removeClass("scrolled");
		}
	}
	// Au départ !
	checkScroll();
	// Vérification du scroll
	$(document).scroll( function(){ 
		checkScroll();
	});
	// MENU
	$("div#main-menu").hover(function() {
		// On ajuste la largeur des sous menus en fonction des parents	
		$("div.main-menu-column div.subcolumn").each(function() {
			$(this).width($(this).parent("div").width()-2);
		});
	});
	// Hover
	$("div#header div#header-menu div#main-menu div.main-menu-column").hover(function() {		
		if ($(this).children("div.subcolumn")) {
			$(this).children("div.subcolumn").dequeue().stop().slideDown("normal");
		}
	}, function() {	
		if ($(this).children("div.subcolumn")) {
			$(this).children("div.subcolumn").dequeue().stop().slideUp("normal");
		}		
	});
	
	// DIAPORAMA
	// Gestion du slideshow
	function slideshowSwitch(id, fast) {
		// vitesses
		var vitesse_anim = (fast) ? 700 : 2000;
		var vitesse_delay = (fast) ? 250 : 1000;
		// images
		$("div#slideshow-images a.active").removeClass("active").dequeue().stop().fadeOut(vitesse_anim);
		$("div#slideshow-images a:eq("+id+")").addClass("active").dequeue().stop().fadeIn(vitesse_anim)
		// vignettes
		$("div#slideshow").addClass("changing").delay(vitesse_delay).queue(function(next) {
			$("div#slideshow div#slideshow-vignettes div.active").removeClass("active");
			$("div#slideshow div#slideshow-vignettes div:eq("+id+")").addClass("active");	
			$("div#slideshow").removeClass("changing");		
			next();
		});		
	}
	function slideshowRotate() {
		var id = false;
		if ($("div#slideshow-images a.active").html() && $("div#slideshow-images a.active").next("a").html()) 
			id = $("div#slideshow-images a.active").next("a").index();
		else
			id = $("div#slideshow-images a:first-child").index();
		slideshowSwitch(id, false);
	}
	slideshowRotate();
	var interval_rotation = setInterval(function() {
		slideshowRotate();
	}, 5000);
	$("div#slideshow div#slideshow-vignettes div").click(function() {
		slideshowSwitch($(this).index(), true);
		clearInterval(interval_rotation);
		interval_rotation = setInterval(function() {
			slideshowRotate();
		}, 5000);
	});
	// Correction conflit css transition au hover sur lien	
	$("div#slideshow div#slideshow-images a[href] img").hover(function() {
		$(this).stop().animate({opacity: .8}, 400);
	},function() {		
		$(this).stop().animate({opacity: 1}, 400);
	});	
	
	// Rollover sur produits homepage
	$("a.selection-produit").hover(function() {
		var titre = $(this).children("div.name");
		titre.width($(this).width()-20);
		var hauteur_anim = titre.height()+20;
		titre.stop().animate({ marginTop: '-'+hauteur_anim+'px'}, 200);
	}, function() {
		var titre = $(this).children("div.name");
		titre.stop().animate({ marginTop: '0px'}, 200);
	});
		
	// Liens confirm
	$("*[confirm]").click(function(e) {
		if (!confirm($(this).attr("confirm")))
			e.preventDefault();
	});
  
  // Articles filter
  $("select#articles-category-selector-select").change(function() {
    window.location.href = $(this).val();
  });
});