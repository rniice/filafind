/*============================================================================
  The New Standard Shopify Theme
==============================================================================*/
window.standard = window.standard || {};

standard.cacheSelectors = function () {
  standard.cache = {
    // General
    $html: $('html'),
    $body: $('body'),

    // Header
    $cartPrice: $('#cart-price'),

    // Home Page
    $slider: $('.flexslider'),

    // Navigation
    $navWrap: $('#navWrap'),
    $nav: $('#nav'),

    // Equal height elements
    $browseByHeight: $('#browse-by-category').find('.coll-image-wrap'),
    $featuredProductsHeight: $('#featured-products').find('.coll-image-wrap'),
    $generalProductHeight: $('.product-list').find('.coll-image-wrap'),

    // Placeholders
    $placeholders: $('[placeholder]'),

    // Currency picker
    $currencyToggle: $('#currency-picker-toggle'),
    $currencyPicker: $('#currencies'),

    // Main product image on product page
    $productImage: $('#productPhotoImg')
  }
}

standard.init = function () {
  standard.cacheSelectors();

  standard.cache.$html.removeClass('no-js');
  if ('ontouchstart' in window) {
    standard.cache.$html.removeClass('no-touch').addClass('touch');
  }

  // Run on load
  standard.responsiveNav();
  standard.sliders();
  standard.cartPrice();
  standard.equalImageHeights();
  standard.productImageSwitch();
  standard.placeholderFix();
  standard.formValidation();
  standard.currencySelector();
  standard.saveCartOnClose();
  standard.lightbox();

}

standard.accessibleNav = function () {
  var $nav = standard.cache.$nav,
      $allLinks = $nav.find('a'),
      $topLevel = $nav.children('li').find('a'),
      $parents = $nav.find('.has-dropdown'),
      $subMenuLinks = $nav.find('.sub-nav').find('a'),
      activeClass = 'nav-hover',
      focusClass = 'nav-focus';

  // Mouseenter
  $parents.on('mouseenter touchstart', function(evt) {
    var $el = $(this);

    if (!$el.hasClass(activeClass)) {
      evt.preventDefault();
    }

    showDropdown($el);
  });

  $parents.on('mouseleave', function() {
    hideDropdown($(this));
  });

  $subMenuLinks.on('touchstart', function(evt) {
    // Prevent touchstart on body from firing instead of link
    evt.stopImmediatePropagation();
  });

  $allLinks.focus(function() {
    handleFocus($(this));
  });

  $allLinks.blur(function() {
    removeFocus($topLevel);
  });

  // accessibleNav private methods
  function handleFocus ($el) {
    var $subMenu = $el.next('ul');
        hasSubMenu = $subMenu.hasClass('sub-nav') ? true : false,
        isSubItem = $('.sub-nav').has($el).length,
        $newFocus = null;

    // Add focus class for top level items, or keep menu shown
    if ( !isSubItem ) {
      removeFocus($topLevel);
      addFocus($el);
    } else {
      $newFocus = $el.closest('.has-dropdown').find('a');
      addFocus($newFocus);
    }
  }

  function showDropdown ($el) {
    $el.addClass(activeClass);

    setTimeout(function() {
      standard.cache.$body.on('touchstart', function() {
        hideDropdown($el);
      });
    }, 250);
  }

  function hideDropdown ($el) {
    $el.removeClass(activeClass);
    standard.cache.$body.off('touchstart');
  }

  function addFocus ($el) {
    $el.addClass(focusClass);
  }

  function removeFocus ($el) {
    $el.removeClass(focusClass);
  }
}

standard.responsiveNav = function () {
  $(window).resize(function () {
    waitForFinalEvent(function(){
      // Replace original nav items and remove more link
      standard.cache.$nav.append($('#moreMenu--list').html());
      $('#moreMenu').remove();
      standard.alignMenu();
    }, 200, 'uniqueID');
  });
  standard.alignMenu();
}

standard.alignMenu = function () {
  var $nav = standard.cache.$nav,
      w = 0,
      i = 0,
      wrapperWidth = standard.cache.$navWrap.outerWidth() - 130, // magic number for 'More' link width
      menuhtml = '';

  $.each($nav.children(), function () {
    var $el = $(this);
    w += $el.outerWidth(true);
    if (wrapperWidth < w) {
      menuhtml += $('<div>').append($el.clone()).html();
      $el.remove();
      i++;
    }
  });

  if (wrapperWidth < w) {
    $nav.append(
      '<li id="moreMenu" class="nav-item has-dropdown">'
        + '<a href="#" class="nav-item-link">' + "More" + ' <span class="icon icon-arrow-down" aria-hidden="true"></span></a>'
        + '<ul id="moreMenu--list" class="sub-nav">' + menuhtml + '</ul></li>'
    );
  }

  // Finish by resetting accessibleNav function
  standard.accessibleNav();
}

standard.sliders = function () {
  var $slider = standard.cache.$slider;

  if ($slider.length) {
    $(window).on('load', function() {
      $slider.flexslider({
        animation: 'slide',
        animationSpeed: 500,
        pauseOnHover: true,
        keyboard: false,
        slideshow: true,
        slideshowSpeed: 7000,
        smoothHeight: true,
        end: function(slider) {
          slider.flexAnimate(1);
          slider.flexAnimate(0);
        }
      });
    });
  }
};

standard.cartPrice = function () {
  var $price = standard.cache.$cartPrice,
      priceCount = $price.text().length;

  if (priceCount <= 5) { $price.css('opacity',1); }
  if (priceCount >= 6) { $price.css('font-size', '18px').css('opacity',1) }
  if (priceCount >= 7) { $price.css('font-size', '15px').css('opacity',1) }
  if (priceCount >= 8) { $price.css('font-size', '13px').css('opacity',1) }
  if (priceCount >= 9) { $price.css('font-size', '11px').css('opacity',1) }
}

standard.equalImageHeights = function () {
  $(window).load(function() {
    sizeElements();
  });

  $(window).resize(function () {
    waitForFinalEvent(function(){
      sizeElements();
    }, 200, 'uniqueId');
  });

  function sizeElements() {
    standard.cache.$browseByHeight.equalHeights();
    standard.cache.$featuredProductsHeight.equalHeights();
    standard.cache.$generalProductHeight.equalHeights();
  }

}

standard.productImageSwitch = function () {
  if (standard.cache.$body.hasClass('template-product')) {

    // Initialize Colorbox.
    $('a[rel="gallery"]').colorbox({
      rel:'gallery',
      maxWidth:"95%",
      maxHeight:"95%",
      scalePhotos:true
    });

    // Activate Colorbox on main image.
    standard.cache.$productImage.on('click', function() {
      var imageId = $(this).data('image-id');
      $('#lightbox a[data-image-id="' + imageId + '"]').trigger('click');
    });

    // Display new photo when thumbnail is clicked.
    $('#product-photo-thumbs a').on('click', function(evt) {
      evt.preventDefault();
      var $el = $(this),
          newImageId = $el.data('image-id'),
          newImageSrc = $el.attr('href').replace('_1024x1024', '_grande');
      standard.switchImage(newImageSrc, { id: newImageId }, standard.cache.$productImage[0]);
    });

  }
}

standard.switchImage = function (src, imgObject, el) {
  // Make sure element is a jquery object
  var $el = $(el);
  $el.data('image-id', imgObject.id).attr('src', src);
};

standard.placeholderFix = function () {
  if (document.createElement('input').placeholder == undefined) {
    standard.cache.$html.addClass('no-placeholder');

    standard.cache.$placeholders.each(function (){
      var $el = $(this);
      if ($el.val() === '') {
        var hint = $el.attr('placeholder');
        $el.val(hint).addClass('hint');
      }
    });

    standard.cache.$placeholders.focus(function () {
      var $el = $(this);
      if ($el.val() === $el.attr('placeholder')) {
        $el.val('').removeClass('hint');
      }
    }).blur(function () {
      var $el = $(this);
      if ($el.val() === '') {
        $el.val($el.attr('placeholder')).addClass('hint');
      }
    });
  }
}

standard.formValidation = function () {
  $('input.error, textarea.error').focus(function() {
    $(this).removeClass('error');
  });

  $('form :submit').click(function() {
    var $el = $(this);
    $el.parents('form').find('input.hint, textarea.hint').each(function() {
      $el.val('').removeClass('hint');
    });
    return true;
  });
}

standard.saveCartOnClose = function () {
  if (standard.cache.$body.hasClass('template-cart')) {
    $(window).unload(function() {
      var params = {
        type: 'POST',
        url: '/cart/update.js',
        data: $('form[action="/cart"]').serialize(),
        dataType: 'json',
        async: false
      };
      $.ajax(params);
    });
  }
}

standard.currencySelector = function () {
  if (!standard.cache.$currencyToggle.length) {
    return;
  }

  var toggle = standard.cache.$currencyToggle,
      picker = standard.cache.$currencyPicker;

  toggle.on('click', function(evt) {
    evt.preventDefault();
    toggle.hide();
    picker.fadeIn();
  });

  picker.on('change', function() {
    picker.hide();
    toggle.fadeIn();
  });

  picker.on('blur', function() {
    picker.hide();
    toggle.fadeIn();
  });
}

standard.lightbox = function () {
  if ($.isFunction($.fn.colorbox)) {
    // For all images added with the RTE that aren't linking to a page,
    // when we are looking at a blog post.
    $('.template-article .rte img').not('a > img').each(function() {
      // Matching images that aren't already shown in their original size.
      var re = /(_small)|(_compact)|(_medium)|(_large)|(_grande)/;
      var src = $(this).attr('src');
      if (re.test(src)) {
        // Determining the URL to the original image.
        var href = src.replace(re, '');
        // Activating lightbox.
        $(this).wrap('<a></a>')
          .parent()
          .attr('href', href)
          .addClass('lightbox')
          .colorbox({
            maxWidth:"95%",
            maxHeight:"95%",
            scalePhotos:true});
        }
    });
    $('.lightbox').colorbox({
      maxWidth:"95%",
      maxHeight:"95%",
      scalePhotos:true});
    $('.inline').colorbox({
      maxWidth:"95%",
      maxHeight:"95%",
      inline:true});
  }
}

// Initialize JS on docready
$(standard.init)
