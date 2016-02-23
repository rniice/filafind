adroll_adv_id = "";
adroll_pix_id = "";
(function () {
    function parseQuery(query) {
        var Params = new Object();
        if (!query) return Params;
        var Pairs = query.split(/[;&]/);
        for (var i = 0; i < Pairs.length; i++) {
            var KeyVal = Pairs[i].split('=');
            if (!KeyVal || KeyVal.length != 2) continue;
            var key = decodeURIComponent(KeyVal[0]);
            var val = decodeURIComponent(KeyVal[1]);
            val = val.replace(/\+/g, ' ');
            Params[key] = val;
        }
        return Params;
    }
    if (typeof Shopify !== undefined && Shopify.Checkout !== undefined) {
        if (Shopify.Checkout.page !== undefined && Shopify.Checkout.page === "thank_you") {
            if (Shopify.checkout !== undefined && Shopify.checkout["total_price"]) {
                adroll_conversion_value = Shopify.checkout["total_price"];
                adroll_currency = Shopify.checkout["currency"];
                adroll_email = Shopify.checkout["email"];
                adroll_custom_data = {"ORDER_ID": Shopify.checkout["order_id"], "USER_ID": Shopify.checkout["customer_id"] };
            }
        }
    }
    var scripts = document.getElementsByTagName('script');
    for(var i = 0; i < scripts.length; i++){
        var script = scripts[i];
        if (script.src && script.src.indexOf('shopify_rolling_bootstrap.js') != -1) {
            var queryString = script.src.replace(/^[^\?]+\??/, '');
            var params = parseQuery(queryString);

            adroll_adv_id = params["adroll_adv_id"];
            adroll_pix_id = params["adroll_pix_id"];

            // Normal AdRoll Pixel Code here
            __adroll_loaded = true;
            var scr = document.createElement("script");
            var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
            scr.setAttribute('async', 'true');
            scr.type = "text/javascript";
            scr.src = host + "/j/roundtrip.js";
            ((document.getElementsByTagName('head') || [null])[0] ||
            document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
            break;
        }
    }
    //var script = scripts[scripts.length - 2];
}());
