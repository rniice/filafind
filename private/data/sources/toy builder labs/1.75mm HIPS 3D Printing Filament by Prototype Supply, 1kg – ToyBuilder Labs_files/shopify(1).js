(function() {
    var first_js = document.getElementsByTagName('script')[0];
    var js = document.createElement('script');
    
    js.src = 'https://static.leaddyno.com/js';
    
    js.type = "text/javascript";
    js.async = true;

    var _ld_init = function() {
        LeadDyno.key = 'a21bf43a7d751c07af34c995952c7e03a1aa9b9b';
        

        LeadDyno.initShopify();
        LeadDyno.recordVisit();
        LeadDyno.autoWatch();

    };

    if (js.addEventListener) { // normal browsers
        js.addEventListener('load', function() {
            _ld_init();
        }, false);
    } else {
        js.onreadystatechange = function() { // old IEs
            if (js.readyState in {loaded: 1, complete: 1}) {
                js.onreadystatechange = null;
                _ld_init();
            }
        };
    }

    first_js.parentNode.insertBefore(js, first_js);
})();