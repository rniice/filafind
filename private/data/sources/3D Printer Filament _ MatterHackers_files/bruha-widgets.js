var loader_element = '<img src="/static/ajax-loader-blue.gif" style="height:16px;width:16px;" alt="...">';
var widgets_loading = false;

$(document).ready(function () {
    cartWidgetBindAddToCart();
    cartWidgetBindRemoveFromCart();
    cartWidgetBindQuantityInput();
    productWidgetLoadWidgets(49);
    bindResponsiveNavigation();
    articleWidgetLoadWidgets();
    bindProductSearch();
    bindNewsletterSignup();
    bindProductNoticeSignup();
    printFeedLoadWidgets();
    bindPrintFeedWidget();
    bindOutOfStockToast();
    setCartCount();
    setCarousel();
    setMobileUI();
    bindShowMoreElement();
    bindMenuAnimations();
    bindMenuDropdownUtils();
    bindLoadOnScroll();


});



function bindLoadOnScroll() {
    widgets_loading = false;
    $(window).scroll(function () {
        if ($("div[data-is-loaded='false']").first().length > 0) {
            var first_unloaded_offset = $("div[data-is-loaded='false']").first().offset();
            if (typeof(first_unloaded_offset) !== null) {
                var position = first_unloaded_offset.top;
                var $w = $(window);
                var bottom_edge_y = $w.scrollTop() + $w.height();
                if (bottom_edge_y * 2.3 >= position && widgets_loading == false) {
                    productWidgetLoadWidgets(37);
                }
            }
        }
    })
}

function bindMenuDropdownUtils() {
    $('.store-link').click(function (e) {

        if ($(window).width() < 768) {
            e.preventDefault();
        }
    });

    $.fn.inView = function (inViewType) {
        var viewport;
        viewport = {};
        viewport.top = $(window).scrollTop();
        viewport.bottom = viewport.top + $(window).height();
        var bounds = {};
        bounds.top = this.offset().top;
        bounds.bottom = bounds.top + this.outerHeight();
        switch (inViewType) {
            case 'bottomOnly':
                return ((bounds.bottom <= viewport.bottom) && (bounds.bottom >= viewport.top));
            case 'topOnly':
                return ((bounds.top <= viewport.bottom) && (bounds.top >= viewport.top));
            case 'both':
                return ((bounds.top >= viewport.top) && (bounds.bottom <= viewport.bottom));
            default:
                return ((bounds.top >= viewport.top) && (bounds.bottom <= viewport.bottom));
        }
    };

}
function bindResponsiveNavigation() {
    $(window).on('resize', function () {
        var windowWidth = window.innerWidth;
        if (windowWidth <= 767) {

            $('.icon-parent').appendTo('.navbar-header');
            $('#bs-navbar-collapse-1').addClass('navmenu navmenu-default navmenu-fixed-left offcanvas-sm');
            if ($('#store-dropdown-icon').length == 0) {
                $('#main_nav1').append("<span id='store-dropdown-icon' class=' store-dropdown-icon glyphicon glyphicon-chevron-down'></span>");
            }
            $('#store-dropdown').appendTo('#main_nav1')
        }
        if (windowWidth >= 768) {
            if ($('#store-dropdown-icon').length > 0) {
                $('#store-dropdown-icon').remove()
            }
            $('#bs-navbar-collapse-1').removeClass('navmenu navmenu-default navmenu-fixed-left offcanvas-sm');
            $('#store-dropdown').appendTo('.store-dropdown-container');
            $('.icon-parent').appendTo('.shipping-cart-user-wrapper')
        }
    });
}

function bindShowMoreElement() {
    $('.show-more-div').unbind('click');
    $('.show-more-div').click(function () {
        productWidgetLoadWidgets(48);

    });

}
function velocity_slide_toggle(e){
    if ($(e).css('display')== 'none'){
        $(e).velocity("slideDown", { duration: 500 })
    }
    else{
        $(e).velocity("slideUp", { duration: 500 })
    }
}
function bindMenuAnimations() {


    $('#main_nav1').on({
        'touchstart': function (e) {
            if ($(window).width() > 768) {
                e.preventDefault();
                velocity_slide_toggle('#store-dropdown');
            }
        }
    });
    var isvisible = false;
    $(window).scroll(function () {
        if (($('.navbar-top').inView('bottomOnly')) == false && isvisible == false) {
            ($('.mh-logo-top').velocity({width: 130},{duration: 350}));
            isvisible = true;
        }
        if (($('.navbar-top').inView('bottomOnly')) == true && isvisible == true) {
            ($('.mh-logo-top').velocity({width: 0},{duration: 350}));
            isvisible = false;
        }

    });

    $('.icon-container').hover(function () {
            $(this).find('span').css('color', '#000');
            $(this).find('svg').css('fill', 'black')

        },
        function () {
            $(this).find('span').css('color', '#ffffff');
            $(this).find('svg').css('fill', 'white')
        });
    $(".login-menu-item").click(function () {
        window.location = $(this).find("a").attr("href");
        return false;
    });
    $(".login-menu-top").click(function () {
        var link = $(this).find("a").attr("href");
        if (typeof(link) !== 'undefined'){
            window.location = link;
        }
        return false;
    });
    $(".icon-cart").click(function () {
        window.location = '/checkout/cart';
        return false;
    });
    if ($(window).width() > 768) {
        var timer;
        $("#main_nav1").hover(function () {
            if (timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function () {

                $("#store-dropdown").velocity("slideDown", { duration: 500 })
            }, 500)

        }, function () {
            if (timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function () {
                $("#store-dropdown").velocity("slideUp", {duration:300});
            }, 500)
        });
        function is_touch_device() {
            return 'ontouchstart' in window // works on most browsers
                || 'onmsgesturechange' in window; // works on ie10
        };


        $("#store-dropdown").hover(function () {

            clearTimeout(timer);

        }, function () {
            if (timer) {
                clearTimeout(timer);
                timer = null
            }
            timer = setTimeout(function () {
                $("#store-dropdown").velocity("slideUp", {duration:300});
            }, 500)
        });
    }
    else {
        $('#main_nav1').click(function () {
            if ($("#store-dropdown-icon").hasClass('store-dropdown-icon-toggled')) {
                $('#store-dropdown-icon').addClass('store-dropdown-icon-animation');
                window.setTimeout(function () {
                    $('#store-dropdown-icon').removeClass('glyphicon-chevron-up');
                    $('#store-dropdown-icon').addClass('glyphicon-chevron-down');
                }, 499);
                $('#store-dropdown-icon').removeClass('store-dropdown-icon-toggled');
            }

            else {
                $('#store-dropdown-icon').addClass('store-dropdown-icon-toggled');
                $('#store-dropdown-icon').addClass('store-dropdown-icon-animation');
                window.setTimeout(function () {
                    $('#store-dropdown-icon').removeClass('glyphicon-chevron-down');
                    $('#store-dropdown-icon').addClass('glyphicon-chevron-up');
                }, 499);
            }

            velocity_slide_toggle("#store-dropdown");
            window.setTimeout(function () {

                $('#store-dropdown-icon').removeClass('store-dropdown-icon-animation');
            }, 500);

        })

    }
    $('.login-menu').on("tap", function () {
        $(".login-dropdown").velocity("slideDown", { duration: 200 });

    });
    $(".login-menu").hover(function () {
        if (timer) {
            clearTimeout(timer);
            timer = null
        }
        timer = setTimeout(function () {

            $(".login-dropdown").velocity("slideDown", { duration: 200 });
        }, 50)

    }, function () {
        if (timer) {
            clearTimeout(timer);
            timer = null
        }
        timer = setTimeout(function () {
            $(".login-dropdown").velocity("slideUp", {duration:200});
        }, 50)
    });

}

function setMobileUI() {
    if ($(window).width() < 768) {

        $('.icon-parent').appendTo('.navbar-header');
        $('#main_nav1').append("<i id='store-dropdown-icon' class=' store-dropdown-icon glyphicon glyphicon-chevron-down'></i>");
        $('#bs-navbar-collapse-1').delay(300).css('visibility', 'visible');
        $('#bs-navbar-collapse-1').addClass('navmenu navmenu-default navmenu-fixed-left offcanvas-sm');
        $('#store-dropdown').appendTo('#main_nav1');
    }
}

function setCarousel() {
    $('.product-sliders').css('display', 'block');
    if ($(window).width() < 370) {
        var min_val = 2

    }
    else if ($(window).width() < 450) {
        var scroll_amnt = 1;
        var widget_width = 100;
        var min_val = 2
    } else if ($(window).width() < 739) {
        var scroll_amnt = 1;
        var widget_width = 140;
        var min_val = 2
    } else if ($(window).width() < 1300) {
        var scroll_amnt = 2;
        var widget_width = 250;
        var min_val = 2
    } else {
        var scroll_amnt = 4;
        var widget_width = 300;
        var min_val = 2
    }
    $(".list_carousel1").swiperight(function () {
        return $(this).find('.caroufredsel').trigger("prev");
    });
    $(".list_carousel1").swipeleft(function () {
        return $(this).find('.caroufredsel').trigger("next");
    });

    var carousels = ['#secondCarousel','#thirdCarousel','#fourthCarousel'];
    for (var i = 0; i < carousels.length; i++) {
        if ( $( carousels[i] ).length ) {
            bindCarousel(carousels[i], scroll_amnt);
        }
    }

    if ( $( "#firstCarousel" ).length ) {
        $(function () {
            $('#firstCarousel').carouFredSel({
                auto: false,
                responsive: true,
                width: '100%',
                scroll: scroll_amnt,
                prev: {
                    button: function () {
                        return $(this).parents().eq(1).find(".prev2");
                    }
                },
                next: {
                    button: function () {
                        return $(this).parents().eq(1).find(".next2");
                    }
                },
                items: {
                    height: 'auto',
                    width: 350,
                    visible: {
                        min: 2,
                        max: 5,
                    },
                    swipe: true

                },
                mousewheel: false,
            });
        });
    }
}

function bindCarousel(selector, scroll_amnt)
{
    $(function () {
        $(selector).carouFredSel({
            auto: false,
            responsive: true,
            width: '100%',
            scroll: scroll_amnt,
            prev: {
                button: function () {
                    return $(this).parents().eq(1).find(".prev2");
                }
            },
            next: {
                button: function () {
                    return $(this).parents().eq(1).find(".next2");
                }
            },
            items: {
                height: 'auto',
                width: 300,
                visible: {
                    min: 2,
                    max: 10,
                },
                swipe: true

            },
            mousewheel: false,

        });
    });
}


function setCartCount() {
    if ($('#items-in-cart').html()) {
        $('#no_items').html($('#items-in-cart').html())

    } else {
        $('#no_items').html(0)
    }
}


function setToastrOptions() {
    toastr.options = {
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "showDuration": "500",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "2000",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
}

function bindOutOfStockToast() {


    $(".disabled_product").unbind('click');
    $(".disabled_product").click(function () {
        setToastrOptions();
        toastr.options.preventDuplicates = true;
        toastr.warning('Oops! Item Out of Stock.');
    })
}

function helperLooksLikeMail(str) {
    var lastAtPos = str.lastIndexOf('@');
    var lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
}

function printFeedLoadWidgets() {
    if ($('.print-feed-widget-container').length > 0) {
        $.ajax({
            type: "POST",
            url: '/widget/print-feed-recent',
            data: {},
            dataType: 'json',
            beforeSend: function (x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/json;charset=UTF-8");
                }
            },
            success: function (data) {
                var content = data['content'];
                $('.print-feed-widget-container').html(content);
                bindPrintFeedWidget();
            },
            error: function (xhr) {
                // $('[akey=' + akey + ']').html('unable to load');
                return;
            }
        });
    }
}

function bindPrintFeedWidget() {
    $('.print-feed-widget').unbind('click');
    $('.print-feed-widget').click(function () {
        var topic_key = $(this).attr('data-topic-key');
        window.location.href = '/print-feed/' + topic_key;

    });
}

function bindProductNoticeSignup() {
    $('#productNoticeSubscribeLink').unbind('click');
    $('#productNoticeSubscribeLink').click(function () {
        var product_key = $(this).attr('data-item-key');
        TINY.box.show({
            html: "<div style='font-size: 14px;'>Alert me when this is available:</div><input id='mce-EMAIL' class='email productemail' type='email' name='EMAIL'  style='width:270px;height:20px;padding:2px;margin-top:10px;' placeholder='Email Address' /><div id='productAlertMessage' style='margin-top:10px;color:red;font-size:13px;'></div><div id='productAlertSubscribeLink' class='standard-link' style='color:#FA6900;font-weight:bold;margin-top:3px;'>Signup</div>",
            animate: true,
            close: true,
            top: 5,
            openjs: function () {
                bindProductAlertSignup(product_key);
            }
        });
    });
}

function bindProductAlertContinue() {
    $('#productAlertContinueLink').unbind('click');
    $('#productAlertContinueLink').click(function () {
        $('#productAlertContinueLink').unbind('click');
        TINY.box.hide();
    });

}

function bindProductAlertSignup(product_key) {
    $('#productAlertSubscribeLink').unbind('click');
    $('#productAlertSubscribeLink').html('Signup');
    $('#productAlertSubscribeLink').click(function () {
        $(this).unbind('click');
        $(this).html('Saving...');
        var email = $('.productemail').val();
        if (helperLooksLikeMail(email)) {
            $.ajax({
                type: "POST",
                url: '/handlers/email-signup',
                data: {
                    email: email,
                    signupType: 'product-notice',
                    signupItem: product_key
                },
                dataType: 'json',
                success: function (data) {
                    TINY.box.fill("<div style='font-size: 14px;margin-bottom:10px;'>Alert sign-up successful!</div><div id='productAlertContinueLink' class='standard-link' style='color:#FA6900;font-weight:bold;margin-top:3px;'>Continue</div>");
                    bindProductAlertContinue();
                },
                error: function (xhr) {
                    $('#productAlertMessage').html('Oops! We were unable to process.');
                    TINY.box.fill($('.tcontent').html());
                }
            });
        } else {
            bindProductAlertSignup();
            $('#productAlertMessage').html('Oops! Please enter a valid email address.');
            TINY.box.fill($('.tcontent').html());
        }
    });
}

function bindNewsletterSignup() {
    $('#newsletterSubscribeLink').unbind('click');
    $('#newsletterSubscribeLink').html("Subscribe");
    $('#newsletterSubscribeLink').click(function () {
        $(this).unbind('click');
        var email = $('#mce-EMAIL').val();

        if (helperLooksLikeMail(email)) {
            $(this).html('Subscribed!');
            $(this).removeClass('standard-link');
            $('#newsletterSignupMessage').html('');
            $('#mce-EMAIL').hide();
            $.ajax({
                type: "POST",
                url: '/handlers/email-signup',
                data: {
                    email: email,
                    signupType: 'newsletter'
                },
                dataType: 'json',
                success: function (data) {

                },
                error: function (xhr) {

                }
            });
        } else {
            bindNewsletterSignup();
            $('#newsletterSignupMessage').html('Please enter a valid email.');
        }
    });
}

function cartWidgetBindQuantityInput() {
    $('.add-to-cart-quantity').click(function () {
        $(this).select();
    });
}

function productWidgetLoadWidgets(n) {
    i = 1;
    widgets_loading = true;

    $('.product-widget-container').each(function () {

        var is_loaded = $(this).attr('data-is-loaded');
        if (is_loaded !== 'true' && i < n) {
            var pkey = $(this).attr('data-product-key');
            var size = $(this).attr('data-widget-size');
            getProductWidget(pkey, size);
            i = i + 1

        }
        if (is_loaded !== 'true' && i == n) {
            $('.show-more-div').css('display', 'block');
            i = i + 1
        }

    });
    if (i < n) {
        $('.show-more-div').css('display', 'none');


    }
    window.setTimeout(function () {
        widgets_loading = false
    }, 3000);


}

function getProductWidget(pkey) {
    var data = $('[data-product-key=' + pkey + ']').data();
    $.ajax({
        type: "POST",
        url: '/product-widget/' + pkey,
        data: data,
        dataType: 'json',
        success: function (data) {
            var content = data['content'];
            $('[data-product-key=' + pkey + ']').html(content);

            $('[data-product-key=' + pkey + ']').attr('data-is-loaded', 'true');
            $('[data-product-key=' + pkey + ']').attr('style', $('[data-product-key=' + pkey + ']').attr('style') + ';height:320px;');
            $('[data-product-key=' + pkey + ']').find('.product-detail-widget').css('height', '280px');
            cartWidgetBindAddToCart();
        },
        error: function (xhr) {
            $('[pkey=' + pkey + ']').html('unable to load');
        }
    });

}

function articleWidgetLoadWidgets(size, category) {
    $('.article-widget-container').each(function () {
        var is_loaded = $(this).attr('data-is-loaded');
        if (is_loaded !== 'true') {
            var akey = $(this).attr('data-article-key');
            var size = $(this).attr('data-widget-size');
            getArticleWidget(akey, size, category);
        }
    });
}

function cartWidgetBindRemoveFromCart() {
    $('.remove-from-cart-button').unbind('click');
    $('.remove-from-cart-button').click(function () {
        var item_key = $(this).attr('data-item-key');
        var index = $(this).attr('index');
        //$(this).parent().parent().hide();
        $('#cart-total').html('saving..');
        $.ajax({
            type: "POST",
            url: '/handlers/cart-remove',
            data: {
                itemKey: item_key,
                index: index
            },
            dataType: 'json',
            beforeSend: function (x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/json;charset=UTF-8");
                }
            },
            success: function (data) {
                var status = data['status'];
                setToastrOptions();


                toastr.info('Item Removed from Cart');
                if (status == 'success') {
                    var item_count = data['cart_item_count'];
                    var content = data['cart_widget'];

                    _gaq.push(['_trackEvent', 'Cart', 'Remove', item_key]);
                    $('#no_items').html(data['cart_item_count']);

                    $('#view-cart-link').html('View Cart (' + item_count + ')');
                    $('#cartWidgetContainer').html(content);
                    cartWidgetBindRemoveFromCart();
                } else {
                    $('.cart-error-message').html(data['error-message']);

                }
            },
            error: function (xhr) {
                $('.cart-error-message').html('Unable to remove item');
                $(this).parent().parent().show();
                return;
            }
        });
    });
}

function cartWidgetBindAddToCart() {
    $('.add-to-cart-button').unbind('click');

    $('.add-to-cart-button').click(function () {
        var item_key = $(this).attr('data-item-key');

        var item_quantity = $(".add-to-cart-quantity[data-item-key='" + item_key + "']").val();

        var addons = [];
        $('[name=AddonProduct]').each(function () {
            if (($(this).is(':checked'))) {
                addons.push($(this).val());
            }
        });

        addons = addons.join('|');
        $.ajax({
            type: "POST",
            url: '/handlers/cart-add',
            data: {
                itemQuantity: item_quantity,
                itemKey: item_key,
                addonarray: addons
            },
            dataType: 'json',
            beforeSend: function (x) {
                if (x && x.overrideMimeType) {
                    x.overrideMimeType("application/json;charset=UTF-8");
                }
            },
            success: function (data) {
                var status = data['status'];
                _gaq.push(['_trackEvent', 'Cart', 'Add', item_key, item_quantity]);
                $('.go-to-checkout-button').css('visibility', 'visible').hide().fadeIn(1000);


                setToastrOptions();
                toastr.success('Item Added to Cart');
                if (status == 'success') {
                    //If the page has a cart widget refresh it, otherwise reload


                    var content = data['cart_widget'];
                    var item_count = data['cart_item_count'];
                    $('#no_items').html(item_count);
                    $('#view-cart-link').html('View Cart (' + item_count + ')');
                    $('#cartWidgetContainer').slideUp();
                    $('#cartWidgetContainer').html(content);
                    $('#cartWidgetContainer').slideDown();
                    cartWidgetBindRemoveFromCart();

                } else {
                    $('.cart-error-message').html(data['error-message']);
                }
            },
            error: function (xhr) {
                $('.cart-error-message').html('Unable to add item');
                return;
            }
        });

    });

}

function getArticleWidget(akey, size, category) {
    $.ajax({
        type: "POST",
        url: '/article-widget/' + akey,
        data: {
            size: size,
            category: category
        },
        dataType: 'json',
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.overrideMimeType("application/json;charset=UTF-8");
            }
        },
        success: function (data) {
            var content = data['content'];
            $('[data-article-key=' + akey + ']').html(content);
        },
        error: function (xhr) {
            // $('[akey=' + akey + ']').html('unable to load');
            return;
        }
    });
}

function bindProductSearch() {
    //$('#productSearchInput').select();

    $('.productSearchInput').one('focus', function () {
        $(this).select();
    });

    $('#productSearchInput').keyup(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            $(this).find('.productSearchButton').click();
            $(this).next().find('button').click();
        }
    });

    $('.productSearchButton').click(function () {
        $(this).html(loader_element);
        var query = $(this).parent().prev('#productSearchInput').val();
        window.location.href = '/s/store?q=' + encodeURIComponent(query);
    });


    $('.addon-item').click(function () {
        var check = $(this).find('input[name=AddonProduct]');
        var is_checked = !check.is(':checked');
        check.attr('checked', is_checked);

        if (check.is(':checked')) {
            $(this).addClass('product-checkbox-is-checked');
            parent_price = ($('#price').html());
            parent_price = parent_price.replace('USD', '');
            parent_price = parent_price.replace(',', '');
            parent_price = parseFloat(parent_price);
            child_price = parseFloat(check.attr('price'));
            new_price = child_price + parent_price

            $('#price').html(new_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' USD (with add-ons)')

            list_parent_price = ($('#listprice').html());
            list_parent_price = list_parent_price.replace('USD', '');
            list_parent_price = list_parent_price.replace(',', '');
            list_parent_price = parseFloat(list_parent_price);
            list_child_price = parseFloat(check.attr('listprice'));
            list_new_price = list_child_price + list_parent_price

            $('#listprice').html(list_new_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' USD')
        } else {
            $(this).removeClass('product-checkbox-is-checked');
            parent_price = ($('#price').html());
            parent_price = parent_price.replace('USD', '');
            parent_price = parent_price.replace(',', '');
            parent_price = parseFloat(parent_price);
            child_price = parseFloat(check.attr('price'));
            new_price = parent_price - child_price;
            if ($('#addondiv input:checkbox:checked').length > 0) {
                $('#price').html(new_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' USD (with add-ons)')
            } else {
                $('#price').html(new_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' USD')
            }
            list_parent_price = ($('#listprice').html());
            list_parent_price = list_parent_price.replace('USD', '');
            list_parent_price = list_parent_price.replace(',', '');
            list_parent_price = parseFloat(list_parent_price);
            list_child_price = parseFloat(check.attr('listprice'));
            list_new_price = list_parent_price - list_child_price


            $('#listprice').html(list_new_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' USD')
        }
    });
}
