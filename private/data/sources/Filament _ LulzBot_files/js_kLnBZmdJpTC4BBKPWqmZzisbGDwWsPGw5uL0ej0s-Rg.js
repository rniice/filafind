!function(e){function t(t,i){$elem=e(t,i),$elem.attr("checked")?$elem.closest(".form-item",i).addClass("highlight"):$elem.closest(".form-item",i).removeClass("highlight")}function i(e,t,i){var s=parseFloat(e.val(),10),a=e.parents("div.views-widget").next(".bef-slider").slider("values",0),n=e.parents("div.views-widget").next(".bef-slider").slider("values",1);null!=t?(0==t&&s>n&&(s=n),1==t&&a>s&&(s=a),isNaN(s)&&(s=e.parents("div.views-widget").next(".bef-slider").slider("values",t))):isNaN(s)&&(s=e.parents("div.views-widget").next(".bef-slider").slider("value")),s=parseFloat(s,10),null!=t?e.parents("div.views-widget").next(".bef-slider").slider("values",t,s):e.parents("div.views-widget").next(".bef-slider").slider("value",s)}Drupal.behaviors.betterExposedFilters={attach:function(i){e(".bef-tree input[type=checkbox], .bef-checkboxes input[type=checkbox]").change(function(){t(this,i)}).filter(":checked").closest(".form-item",i).addClass("highlight")}},Drupal.behaviors.betterExposedFiltersSelectAllNone={attach:function(i){var s=e(".form-checkboxes.bef-select-all-none:not(.bef-processed)");if(s.length){var a=Drupal.t("Select All"),n=Drupal.t("Select None"),r=e('<a class="bef-toggle" href="#">'+a+"</a>");r.click(function(s){s.preventDefault(),s.stopPropagation(),a==e(this).text()?e(this).html(n).siblings(".bef-checkboxes, .bef-tree").find(".form-item input:checkbox").each(function(){e(this).attr("checked",!0),t(this,i)}).end().find("input[type=checkbox]:first").change():e(this).html(a).siblings(".bef-checkboxes, .bef-tree").find(".form-item input:checkbox").each(function(){e(this).attr("checked",!1),t(this,i)}).end().find("input[type=checkbox]:first").change()}),s.addClass("bef-processed").each(function(t){var i=r.clone(!0);i.insertBefore(e(".bef-checkboxes, .bef-tree",this)),e("input:checkbox:checked",this).length==e("input:checkbox",this).length&&i.click()})}var l=Drupal.settings.better_exposed_filters;if(l&&l.datepicker&&l.datepicker_options&&e.fn.datepicker){var c=[];e.each(l.datepicker_options,function(e,t){e&&t&&(c[e]=JSON.parse(t))}),e(".bef-datepicker").datepicker(c)}}},Drupal.behaviors.betterExposedFiltersAllNoneNested={attach:function(t,i){e(".form-checkboxes.bef-select-all-none-nested li").has("ul").once("bef-all-none-nested",function(){var t=e(this),i=t.parents("form").submit;t.parents("form").submit=null,t.find("input.form-checkboxes:first").click(function(){e(this).parents("li:first").find("ul input.form-checkboxes").attr("checked",e(this).attr("checked")),t.parents("form").submit=i,t.parents("form").trigger("submit")}).end().find("ul input.form-checkboxes").click(function(){var t=e(this).attr("checked"),i=e(this).parents("ul:first").find("input.form-checkboxes:not(:checked)").size();t&&i||e(this).parents("li:first").parents("li:first").find("input.form-checkboxes:first").attr("checked",t)})})}},Drupal.behaviors.better_exposed_filters_slider={attach:function(t,s){var a=s.better_exposed_filters;a&&a.slider&&a.slider_options&&e.each(a.slider_options,function(t,s){var a="#"+s.viewId+" #edit-"+s.id+"-wrapper .views-widget",n=e(a);n.length||(a="#"+s.viewId+" .bef-slider-wrapper",n=e(a)),n.once("slider-filter",function(){var t=e(this).find("input[type=text]");if(2==t.length){var n,r,l=t.parent().find("input#edit-"+s.id+"-min"),c=t.parent().find("input#edit-"+s.id+"-max");if(!l.length||!c.length)return;n=parseFloat(""==l.val()?s.min:l.val(),10),r=parseFloat(""==c.val()?s.max:c.val(),10),l.val(n),c.val(r),l.parents(a).after(e('<div class="bef-slider"></div>').slider({range:!0,min:parseFloat(s.min,10),max:parseFloat(s.max,10),step:parseFloat(s.step,10),animate:s.animate?s.animate:!1,orientation:s.orientation,values:[n,r],slide:function(e,t){l.val(t.values[0]),c.val(t.values[1])},change:function(e,t){l.val(t.values[0]),c.val(t.values[1])},stop:function(t,i){e(this).parents("form").find(".ctools-auto-submit-click").click()}})),l.blur(function(){i(e(this),0,s)}),c.blur(function(){i(e(this),1,s)})}else{if(1!=t.length)return;if(t.attr("id")!="edit-"+s.id)return;var o=parseFloat(""==t.val()?s.min:t.val(),10);t.val(o),t.parents(a).after(e('<div class="bef-slider"></div>').slider({min:parseFloat(s.min,10),max:parseFloat(s.max,10),step:parseFloat(s.step,10),animate:s.animate?s.animate:!1,orientation:s.orientation,value:o,slide:function(e,i){t.val(i.value)},change:function(e,i){t.val(i.value)},stop:function(t,i){e(this).parents("form").find(".ctools-auto-submit-click").click()}})),t.blur(function(){i(e(this),null,s)})}})})}},Drupal.behaviors.better_exposed_filters_select_as_links={attach:function(t,i){e(".bef-select-as-links",t).once(function(){var t=e(this);if("undefined"!=typeof i.views&&"undefined"!=typeof i.views.ajaxViews){var s=!1;e.each(i.views.ajaxViews,function(e,i){var a=i.view_name.replace(/_/g,"-"),n=i.view_display_id.replace(/_/g,"-"),r="views-exposed-form-"+a+"-"+n,l=t.parents("form").attr("id");return l==r?void(s=!0):void 0}),s&&e(this).find("a").click(function(t){var i=e(this).parents(".bef-select-as-links"),s=i.find("select option");t.preventDefault(),t.stopPropagation(),i.find("select option").removeAttr("selected");var a=e(this).text();$selected=s.filter(function(){return e(this).text()==a}),$selected.attr("selected","selected"),i.find(".bef-new-value").val($selected.val()),i.find("a").removeClass("active"),e(this).addClass("active"),i.parents("form").find(".views-submit-button *[type=submit]").click()})}})}},Drupal.behaviors.betterExposedFiltersRequiredFilter={attach:function(t,i){e(".bef-select-as-checkboxes",t).once("bef-required-filter").ajaxComplete(function(t,s,a){var n=e(this);if("undefined"!=typeof i.views&&"undefined"!=typeof i.views.ajaxViews){var r,l,c=!1;e.each(i.views.ajaxViews,function(e,t){r=t.view_name,l=t.view_display_id;var i="views-exposed-form-"+r.replace(/_/g,"-")+"-"+l.replace(/_/g,"-"),s=n.parents("form").attr("id");return s==i?(c=!0,!1):void 0});var o=e("input",this).attr("name").slice(0,-2);Drupal.settings.better_exposed_filters.views[r].displays[l].filters[o].required&&0==e("input:checked",this).length&&e("input",this).prop("checked",!0)}})}}}(jQuery);;
!function(t){Drupal.behaviors.CToolsAutoSubmit={attach:function(o){function u(o){var u=t(this);u.hasClass("ctools-ajaxing")||u.find(".ctools-auto-submit-click").click()}t("form.ctools-auto-submit-full-form",o).add(".ctools-auto-submit",o).filter("form, select, input:not(:text, :submit)").once("ctools-auto-submit").change(function(o){t(o.target).is(":not(:text, :submit, .ctools-auto-submit-exclude)")&&u.call(o.target.form)});var i=[16,17,18,20,33,34,35,36,37,38,39,40,9,13,27];t(".ctools-auto-submit-full-form input:text, input:text.ctools-auto-submit",o).filter(":not(.ctools-auto-submit-exclude)").once("ctools-auto-submit",function(){var o=0;t(this).bind("keydown keyup",function(u){-1===t.inArray(u.keyCode,i)&&o&&clearTimeout(o)}).keyup(function(e){-1===t.inArray(e.keyCode,i)&&(o=setTimeout(t.proxy(u,this.form),500))}).bind("change",function(e){-1===t.inArray(e.keyCode,i)&&(o=setTimeout(t.proxy(u,this.form),500))})})}}}(jQuery);;
!function(t){t(document).ready(function(){t(document.body).bind("mousedown keyup touchstart",function(e){t(e.target).closest("a,area").each(function(){Drupal.settings.piwik.trackMailto&&t(this).is("a[href^='mailto:'],area[href^='mailto:']")&&_paq.push(["trackEvent","Mails","Click",this.href.substring(7)])})}),t(document).bind("cbox_complete",function(){var e=t.colorbox.element().attr("href");e&&(_paq.push(["setCustomUrl",e]),_paq.push(["trackPageView"]))})})}(jQuery);;
var userLocation={selectors:{},availability:{},initialized:!1,setLocation:!1,state:null,log:function(){"undefined"!=typeof console&&"undefined"!=typeof console.log&&"undefined"!=typeof console.log.apply&&console.log.apply(console,arguments)},changeLocation:function(t){t.preventDefault();var e=userLocation;return e.setStateNeedLocation(),e.setLocation=!1,!1},updateAllSelects:function(t){var e=jQuery(this).val(),o=!1;userLocation.isValidCountrySelected(e)||(o=!0),userLocation.selectors.checkAvailabilityButton.attr("disabled",o),userLocation.selectors.countrySelection.val(e)},isValidCountrySelected:function(t){return t||(t=userLocation.selectors.countrySelection.val()),/^[A-Z]+/.test(t)},checkAvailability:function(t){t.preventDefault();var e=userLocation;if(!e.isValidCountrySelected())return void e.selectors.countrySelection.addClass("error");e.selectors.countrySelection.removeClass("error");var o=e.selectors.countrySelection.val();e.selectors.userLocation.find("span").data("country",o).text(Drupal.t("Viewing availability for ")+e.selectors.countrySelection.first().find("option:selected").text()),jQuery("#add-to-cart-user-location").val(o),e.selectors.checkAvailabilityButton.text(Drupal.t("Checking availability"));var a=jQuery(t.target).closest("form").find('input[name="product_id"],select[name="product_id"]').val();jQuery.ajax({url:"/ajax/store/location",data:{location:o,product_id:a},type:"GET"}).always(function(t){userLocation.selectors.checkAvailabilityButton.text(Drupal.t("Check availability"));var a="disabled",i="Unavailable";if(t.is_available&&(a=!1,i="Add to Cart"),jQuery("form.commerce-add-to-cart").removeClass("disabled").removeClass("in-stock").addClass("unavailable"),jQuery('form.commerce-add-to-cart input[type="submit"]').removeClass("form-button-disabled").attr("disabled",a).val(Drupal.t(i)).show(),e.setStateHaveLocation(),Drupal.settings.hasOwnProperty("filamentSkuColorMap")&&t.hasOwnProperty("related_availability")){var n=[];for(var l in t.related_availability)t.related_availability.hasOwnProperty(l)&&t.related_availability[l]&&t.related_availability[l].hasOwnProperty(o)&&t.related_availability[l][o]>0&&n.push(l);var r=[];for(var s in Drupal.settings.filamentSkuColorMap)if(Drupal.settings.filamentSkuColorMap.hasOwnProperty(s))for(var c=0;c<Drupal.settings.filamentSkuColorMap[s].length;c++)-1!=n.indexOf(Drupal.settings.filamentSkuColorMap[s][c])&&r.push(parseInt(s,10));jQuery(".link--filament-color").each(function(){var t=jQuery(this),e=t.closest("li");-1!=r.indexOf(parseInt(t.data("color"),10))?e.removeClass("unavailable"):e.addClass("unavailable")})}}),Drupal.settings.lulzbot_store.location=o,e.setLocation=!0},hideAddToCartButton:function(){var t="form.commerce-add-to-cart input[type=submit]";jQuery(t).show(),0!==arguments.length&&arguments[0]||(t="form.commerce-add-to-cart.disabled input[type=submit]"),jQuery(t).hide()},init:function(){var t=userLocation;t.initSelectors(),t.setStateHaveLocation();var e=Drupal.settings.hasOwnProperty("lulzbot_store"),o=e&&Drupal.settings.lulzbot_store.hasOwnProperty("location")&&Drupal.settings.lulzbot_store.location;e&&!o&&(t.setStateNeedLocation(),userLocation.selectors.checkAvailabilityButton.attr("disabled",!0)),t.hideAddToCartButton(),jQuery("body").on("change",".form-item-countries select",t.updateAllSelects).off("click","#lulzbot-store-check-availability").on("click","#lulzbot-store-check-availability",t.checkAvailability).off("click","a.link--change-location").on("click","a.link--change-location",t.changeLocation).off("click",".notify-btn").on("click",".notify-btn",t.showModal).off("click","#lulzbot-store-notify-me").on("click","#lulzbot-store-notify-me",t.notify),t.initialized=!0},initSelectors:function(){userLocation.selectors={userLocation:jQuery(".location"),checkAvailabilityButton:jQuery(".button--check-availability"),changeLocationLink:jQuery("a.link--change-location"),countrySelect:jQuery(".country-selection"),countrySelection:jQuery(".form-item-countries select"),notify:jQuery(".form-item-notify-me :input"),notifyButton:jQuery("#lulzbot-store-notify-me"),notifyDescription:jQuery(".notify-me .form-item-description")}},showModal:function(){swal.setDefaults({confirmButtonColor:"#c1d640"});var t={title:"E-mail Notification",text:Drupal.t("Enter your email address to receive an email when this product becomes available."),allowOutsideClick:!0,type:"input",inputType:"email",inputPlaceholder:"email@example.com",confirmButtonText:"Notify Me",showCancelButton:!0,closeOnConfirm:!1,showLoaderOnConfirm:!0,animation:"slide-from-top"};userLocation.selectors.notify.val()&&(t.inputValue=userLocation.selectors.notify.val()),swal(t,function(t){return t===!1?!1:""===t?(sweetAlert.showInputError("Please enter your email."),!1):(userLocation.selectors.notify.val(t),void userLocation.notify(t,function(t){sweetAlert(Drupal.t("Thank You"),t)}))})},notify:function(t,e){if(userLocation.selectors.notify.val()){var o=t,a=userLocation.selectors.notify.closest("form"),i=a.find('input[name="notify_token"]').val(),n={notify_me:o,form_token:i,product_id:parseInt(a.find('input[name="product_id"],select[name="product_id"]').val(),10)};jQuery.ajax({type:"POST",url:"/ajax/store/notify",data:n}).done(function(t){userLocation.log("done"),jQuery('<div class="message">'+Drupal.t("You will be notified when this product becomes available.")+"</div>").insertAfter("fieldset.notify-me"),e(Drupal.t("You will be notified when this product becomes available.")),jQuery("fieldset.notify-me").hide(),jQuery(".notify-btn").hide()}).fail(function(){userLocation.log("fail"),jQuery("fieldset.notify-me").prepend('<div class="message error">Could not add notification right now. Please try again later.</div>'),e(Drupal.t("Could not add notification right now. Please try again later."))})}},setStateHaveLocation:function(){var t=userLocation;t.log("setStateHaveLocation"),t.selectors.countrySelect.hide(),t.selectors.checkAvailabilityButton.hide(),t.selectors.userLocation.show(),t.hideAddToCartButton(),t.selectors.checkAvailabilityButton.attr("disabled","disabled"),t.state="have_location"},setStateNeedLocation:function(){var t=userLocation;t.log("setStateNeedLocation"),t.selectors.userLocation.hide(),t.hideAddToCartButton(!0),t.selectors.countrySelect.show(),t.selectors.checkAvailabilityButton.show(),t.selectors.checkAvailabilityButton.attr("disabled",!1),t.state="need_location"}};Drupal.behaviors.userLocation={attach:function(){userLocation.init()}};;