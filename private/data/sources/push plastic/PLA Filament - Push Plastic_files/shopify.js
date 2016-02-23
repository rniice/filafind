(function() {
  "use strict";
  var Util = function(options) {
    this.options = options || {};
    this.options.debug = this.options.debug || false;
  };

  Util.prototype.debug = function(message, argOne) {
    if (this.options.debug) {
      console.log(message, argOne);
    }
  };

  /**
   * Requests a url and yields the response, used for IE < v10
   * @param {string} method - post, get, put, delete
   * @param {string} url - the location of the data
   * @param {object} data - the data to be sent to the url
   * @param {function} done - the callback for a successful request
   * @param {function} err - the callback for a failed request
   */
  Util.prototype.xdr = function(method, url, data, done, err) {
    var _this = this;
    _this.debug('Getting request using XDR', method, url, data);
    var req = new XDomainRequest();
    req.open(method, url);
    req.onerror = err;
    req.onload = function() {
      _this.debug('Response received successfully', req.responseText);
      done(req.responseText);
    };
    req.send(data);
    return req;
  };

  /**
   * Requests a url and yields the response
   * @param {string} method - post, get, put, delete
   * @param {string} url - the location of the data
   * @param {object} data - the data to be sent to the url
   * @param {function} done - the callback for a successful request
   * @param {function} err - the callback for a failed request
   */
  Util.prototype.xhr = function(method, url, data, done, err) {
    this.debug('Getting request using XHR', method, url, data);
    var req = new XMLHttpRequest();
    req.open(method, url, true);
    if (method !== 'GET' || data) {
      req.setRequestHeader('Content-Type', 'application/json');
    }
    req.onerror = err;
    var _this = this;
    req.onreadystatechange = function() {
      if (req.readyState !== 4) {
        return;
      }

      if (req.status >= 200 && req.status < 400) {
        _this.debug('Response received successfully', req.responseText);
        return done(req.responseText);
      }
      var errMessage = 'Response returned with non-OK status';
      _this.debug(errMessage, req.status);
      err(new Error(errMessage), req.status);
    };
    req.send(data);
    return req;
  };

  /**
   * Handles the request to url
   * @param {string} method - post, get, put, delete
   * @param {string} url - the location of the data
   * @param {object} data - the data to be sent to the url
   * @param {function} done - the callback for a successful request
   * @param {function} err - the callback for a failed request
   */
  Util.prototype.request = function(method, url, data, done, err) {
    if (typeof XDomainRequest !== 'undefined') {
      return this.xdr(method, url, data, done, err);
    }

    if (typeof XMLHttpRequest !== 'undefined') {
      return this.xhr(method, url, data, done, err);
    }

    return err(new Error('CORS not supported'));
  };

  Util.prototype.createGuid = function() {
    // http://stackoverflow.com/a/2117523/2021517
    /*jshint bitwise: false*/
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };

  Util.prototype.addCSS = function(css) {
    if (css) {
      var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      }
      else {
        style.appendChild(document.createTextNode(css));
      }
      head.appendChild(style);
    }
  };

  Util.prototype.transformToAssocArray = function(paramString) {
    var params = {};
    var prmarr = paramString.split("&");
    for (var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
    }
    return params;
  };

  Util.prototype.getQuery = function() {
    var params = window.location.search.substr(1);
    return params ? this.transformToAssocArray(params) : {};
  };

  /*\
  |*|
  |*|  :: cookies.js ::
  |*|
  |*|  A complete cookies reader/writer framework with full unicode support.
  |*|
  |*|  Revision #1 - September 4, 2014
  |*|
  |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
  |*|  https://developer.mozilla.org/User:fusionchess
  |*|
  |*|  This framework is released under the GNU Public License, version 3 or later.
  |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
  |*|
  |*|  Syntaxes:
  |*|
  |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
  |*|  * docCookies.getItem(name)
  |*|  * docCookies.removeItem(name[, path[, domain]])
  |*|  * docCookies.hasItem(name)
  |*|  * docCookies.keys()
  |*|
  \*/
  var Cookies = function() {};

  Cookies.prototype.getItem = function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  };

  Cookies.prototype.setItem = function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
      case Number:
        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
        break;
      case String:
        sExpires = "; expires=" + vEnd;
        break;
      case Date:
        sExpires = "; expires=" + vEnd.toUTCString();
        break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  };

  Cookies.prototype.removeItem = function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  };

  Cookies.prototype.hasItem = function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  };

  Cookies.prototype.keys = function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  };

  window.ReceiptfulUtil = Util;
  window.ReceiptfulCookies = Cookies;
})();

// NOTICE: This script requires the Util script. They are concatenated at
// runtime. See gulpfile.js

(function() {
  "use strict";
  var BASE_URL = 'https://app.receiptful.com';
  var Redeem = function() {};

  Redeem.prototype.createModal = function(content, location) {
    var parent = location || document.body;

    // Styles for the modal window and wrapper
    var css = '#receiptful-redeem-modal {' +
      'border: 2px solid #DCDEE0;' +
      '}';

    css += '@media (max-width: 632px) {' +
    '#receiptful-redeem-modal {' +
    'margin-left:0 !important;' +
    'left: 2.5% !important;' +
    'top: 2.5% !important;' +
    '}}';

      // Add Style Tag...
    var styles = document.createElement('style');
    styles.innerHTML = css;
    parent.appendChild(styles);

    // Create the wrapper
    var wrapper = document.createElement('div');
    wrapper.id = 'receiptful-redeem-wrapper';
    wrapper.style.position = 'fixed';
    wrapper.style.top = '0px';
    wrapper.style.left = '0px';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.background = 'rgba(0, 0, 0, 0.7)';
    wrapper.style.zIndex = 9998;
    parent.appendChild(wrapper);

    // create the modal
    var modal = document.createElement('div');
    modal.id = 'receiptful-redeem-modal';
    modal.style.position = 'absolute';
    modal.style.top = '10%';
    modal.style.left = '50%';
    modal.style.marginLeft = '-300px';
    modal.style.width = '95%';
    modal.style.maxWidth = '600px';
    modal.style.background = '#FFFFFF';
    modal.style.borderRadius = '3px';
    modal.style.zIndex = 9999;
    modal.innerHTML = content;
    parent.appendChild(modal);

    wrapper.onclick = function() {
      parent.removeChild(wrapper);
      parent.removeChild(modal);
      parent.removeChild(styles);
    };
  };

  var util = new window.ReceiptfulUtil();
  var redeem = new Redeem();

  // Get the params and check for a redeem param
  var params = util.getQuery();

  if (params && params.redeem) {
    util.request('GET', BASE_URL + '/redeem/modal/' + params.redeem,
      null, function(data) {
        redeem.createModal(data);
      }, function(err, status) {
        if (status === 404) {
          var html = '<section style="padding: 40px; text-align: center;">' +
            '<h2 style="color: #cc3a3a; font-family: \'Muli\', \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; text-align: center; letter-spacing: -1px; margin-top: 0px; font-size: 38px;">Whoops!</h2>' +
            '<h3 style="font-family: \'Montserrat\', \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; -webkit-font-smoothing: antialiased; text-align: center; color: #6a7278; margin: 0; padding-bottom: 15px; line-height: 18px; ">We couldn\'t find your receipt</h3>' +
            '<p style="font-family: \'Montserrat\', \'HelveticaNeue-Light\', \'Helvetica Neue Light\', \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; color: #6a7278; text-align: center; max-width: 600px; margin: 0 auto; font-size: 18px; width: 95%;">Don\'t worry, just get in touch with the store and they\'ll sort everything out for you' +
            '</p></section>';
          redeem.createModal(html);
        }
      });
  }
})();

// NOTICE: This script requires the util.js script. They are concatenated at
// runtime. See gulpfile.js

(function() {
  "use strict";
  var BASE_URL = 'https://app.receiptful.com';
  var util = new window.ReceiptfulUtil();
  var cookies = new window.ReceiptfulCookies();

  var Receiptful = function() {
    this.settings = {
      initialized: false,
      track: true,
      recommend: false,
      abandonedCart: true
    };
  };

  /**
   * Initializes Receiptful for recommendations and tracking. This function
   * should be used by the implementing website to initialize Receiptful with
   * correct variables, start tracking and recommend products.
   * @param {Object} settings - The settings to use.
   * @param {String} settings.user - The publicKey or storename for the current
   * shop.
   * @param {String} [settings.product] - A product ID for the current
   * page. Enables page tracking and product recommendations.
   * @param {String} [settings.customer] - An ID of the current customer
   * browsing the website.
   * @param {String} [settings.cart] - Comma-separated list of product IDs
   * currently in the shopping cart.
   * @param {Boolean} [settings.recommend] - Tells the script whether or not to
   * fetch recommendations on the current page.
   */
  Receiptful.prototype.init = function(settings) {
    if (typeof settings === 'undefined') {
      return;
    }

    // Update local settings.
    for (var k in settings) {
      this.settings[k] = settings[k];
    }
    this.settings.initialized = true;

    // Always run the recommend function.
    this.recommend();

    // Always run the tracking cookie function
    this.setTrackingCookie();

    // If tracking is enabled, track the page and setup tracking links.
    if (this.settings.track) {
      // We're only interested in tracking pages with products right now.
      if (this.settings.product) {
        this.track('page');
      }
    }

    this.initAbandonedCarts();
  };

  /**
   * Gets the receiptful token which is used to correlate user actions with
   * conversions.
   *
   * The token is either set by an integration during init (such is the case
   * for Shopify) or here. All actions taken during the lifetime of the token
   * (clicks and page views) are tagged with this token so when a conversion
   * occurs, the actions can be correlated with the token.
   */
  Receiptful.prototype.getToken = function() {
    if (this.settings.token) {
      return this.settings.token;
    }

    var cookieName = 'receiptful-token';
    if (!cookies.hasItem(cookieName)) {
      // 15 days cookie
      var maxAge = 60 * 60 * 24 * 15;
      cookies.setItem(cookieName, util.createGuid(), maxAge, '/');
    }
    return cookies.getItem(cookieName);
  };

  /**
   * Gets the current receiptful session. The session cookie is different from
   * the token because it only lives for the duration of the session. It is
   * used for analasys of browser behavior during a single visit rather than
   * across website visits.
   */
  Receiptful.prototype.getSession = function() {
    var cookieName = 'receiptful-session';
    if (!cookies.hasItem(cookieName)) {
      cookies.setItem(cookieName, util.createGuid(), 0, '/');
    }
    return cookies.getItem(cookieName);
  };

  /**
   * Sets a tracking cookie if certain query string values are present on the
   * page.
   */
  Receiptful.prototype.setTrackingCookie = function() {
    // Skip cookie creation if it's already there
    if (cookies.hasItem('receiptful')) {
      return;
    }

    this.sendTrackingClickRequest();
  };

  Receiptful.prototype.sendTrackingClickRequest = function(redirUrl) {
    var searchQuery = document.location
      .search
      .substring(1);

    var query = searchQuery.split('&');

    var receiptId = '';
    var trackingType = '';

    for (var i = 0; i < query.length; i += 1) {
      var data = query[i].split('=');

      if (data[0] === 'receiptful') {
        receiptId = data[1];
      } else if (data[0] === 'receiptfultype') {
        trackingType = data[1];
      }
    }

    // It only makes sense to store a cookie if we have a receipt ID.
    if (receiptId) {
      // 15 days cookie
      var maxAge = 60 * 60 * 24 * 15;

      var value = receiptId + ';' + trackingType;

      cookies.setItem(
        'receiptful',
        value,
        maxAge,
        '/');

      // The presence of a receipt ID always means that it was the result of a
      // click somewhere. Right now, this will always be a click on a receipt
      // so we use "receipt" as tracking source and track the receipt. Notice
      // that this will not work if "init" has not been run yet.
      //
      // NOTE: The receipt ID can also be a followup email ID. They use the
      // same tracking source "receipt" so this tracking request still applies.
      this.track('click', 'receipt', value, redirUrl);
    }
  };

  /**
   * Looks up all links in from the current root element that have been tagged
   * for Receiptful tracking. These links have the data-rf-track attribute that
   * indicates what object they are tracking. This will usually be a product ID
   * in order to track clicks for suggestions for that product.
   */
  Receiptful.prototype.setupLinkTracking = function(rootElem) {
    var links = rootElem.querySelectorAll('[data-rf-track]');
    var _this = this;

    var linkOnClick = function() {
      var productId = null;
      var trackingSource = null;
      var options = {};

      // "this" refers to the anchor link here...
      if (this.dataset) {
        productId = this.dataset.rfTrack;
        trackingSource = this.dataset.rfTrackSource;
        options.widgetName = this.dataset.rfWidgetName;
      } else {
        productId = this.getAttribute('data-rf-track');
        trackingSource = this.getAttribute('data-rf-track-source');
        options.widgetName = this.getAttribute('data-rf-widget-name');
      }

      // Only track a click if the product ID is there.
      if (productId) {
        _this.track('click', trackingSource, productId, this.href, options);
        return false;
      }
    };

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.href) {
        link.onclick = linkOnClick.bind(link);
      }
    }
  };

  /**
   * Track an event. Currently, 'page' and 'click' are supported.
   * @see lib/tracking
   * @param {string} trackingType - The tracking event type, e.g "click".
   * @param {string} trackingSource - The tracking event source, e.g "widget".
   * @param {string} itemRef - A reference to an item that is part of the
   * event. For click tracking this will be the target product ID. For receipt
   * tracking, it will be a Receipt ID.
   * @param {string} redirUrl - An URL to redirect to after the tracking event
   * has occured. Mostly relevant for click tracking.
   * @param {Object} options - Extra options for the request.
   */
  Receiptful.prototype.track = function(trackingType, trackingSource, itemRef, redirUrl, options) {
    var url = BASE_URL + '/tracking/' + trackingType;

    // If not initialized, do not proceed.
    if (!this.settings.initialized || !this.settings.user) {
      return;
    }

    var sessionId = this.getSession();

    // Read the session view history.
    var sessionHistory = [];
    if (typeof window.sessionStorage !== 'undefined') {
      var storageItem = window.sessionStorage.getItem(sessionId);
      if (storageItem) {
        sessionHistory = JSON.parse(storageItem);
      }

      // Only product view history is supported right now.
      if (trackingType === 'page' && this.settings.product) {
        sessionHistory.push({
          id: this.settings.product,
          type: 'product'
        });
      }

      window.sessionStorage.setItem(sessionId, JSON.stringify(sessionHistory));
    }

    var trackingObj = {
      user: this.settings.user,
      sessionId: sessionId,
      sessionHistory: sessionHistory,
      token: this.getToken(),
      trackingType: trackingType,
      trackingSource: trackingSource,
      itemReference: itemRef || '',
      customer: this.settings.customer || '',
      product: this.settings.product || '',
      url: encodeURIComponent(document.URL),
      referrer: encodeURIComponent(document.referrer)
    };

    if (options) {
      for (var key in options) {
        if (options[key]) {
          trackingObj[key] = options[key];
        }
      }
    }

    var onSuccess = function() {
      if (redirUrl) {
        window.location = redirUrl;
      }
    };

    util.request('POST', url, JSON.stringify(trackingObj), onSuccess, onSuccess);
  };

  Receiptful.prototype.recommend = function() {
    if (!this.settings.initialized ||
        !this.settings.recommend ||
        !this.settings.user) {
      return;
    }

    var containers = document.getElementsByClassName('rf-recommendations');
    if (containers.length === 0) {
      return;
    }

    var _this = this;
    var fetchWidget = function(url, container) {
      util.request('GET', url, '', function(text) {
        try {
          var data = JSON.parse(text);
          if (data.html) {
            container.innerHTML = data.html;
          }
          util.addCSS(data.css);
          _this.setupLinkTracking(container);
        } catch (e) {
          console.error(e);
        }
      }, function(errText) {
        console.error(errText);
      });
    };

    // Create a widget request for each container.
    for (var i = 0; i < containers.length; i++) {
      var container = containers[i];

      var url = BASE_URL + '/widget/recommendation' +
        '?product=' + (this.settings.product || '') +
        '&customer=' + (this.settings.customer || '') +
        '&cart=' + (this.settings.cart || '') +
        '&user=' + (this.settings.user || '');

      if (container.dataset) {
        for (var key in container.dataset) {
          var value = container.dataset[key] || '';
          url += '&settings[' + key + ']=' + encodeURIComponent(value);
        }
      }

      fetchWidget(url, container);
    }
  };

  Receiptful.prototype.initAbandonedCarts = function() {
    if (!this.settings.initialized ||
        !this.settings.abandonedCart ||
        !this.settings.user) {
      return;
    }

    var _this = this;
    var inputs = document.querySelectorAll('input');
    var request;
    var emailRegex = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');

    var listenForEmail = function(e) {
      if (!e.target || !e.target.value || e.target.value.indexOf('@') === -1) {
        return;
      }

      if (!emailRegex.test(e.target.value)) {
        return;
      }

      if (request) {
        request.abort();
      }

      var url = BASE_URL + '/api/v1/abandoned-carts/' + _this.getToken() + '/email';
      var data = {
        user: _this.settings.user,
        email: e.target.value
      };

      request = util.request(
        'POST',
        url,
        JSON.stringify(data),
        function() {
        },
        function(err, status) {
          if (status === 0 || status === 400) {
            return;
          }

          console.error(err);
        }
      );
    };

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('blur', listenForEmail);
    }
  };

  window.Receiptful = new Receiptful();
})();

(function() {
  'use strict';

  var startSpinner = function() {
    var spinner = document.createElement('style');
    spinner.innerHTML = '' +
      '@-moz-keyframes spinner-loader {' +
      '  0% {' +
      '    -moz-transform: rotate(0deg);' +
      '    transform: rotate(0deg);' +
      '  }' +
      '  100% {' +
      '    -moz-transform: rotate(360deg);' +
      '    transform: rotate(360deg);' +
      '  }' +
      '}' +
      '@-webkit-keyframes spinner-loader {' +
      '  0% {' +
      '    -webkit-transform: rotate(0deg);' +
      '    transform: rotate(0deg);' +
      '  }' +
      '  100% {' +
      '    -webkit-transform: rotate(360deg);' +
      '    transform: rotate(360deg);' +
      '  }' +
      '}' +
      '@keyframes spinner-loader {' +
      '  0% {' +
      '    -moz-transform: rotate(0deg);' +
      '    -ms-transform: rotate(0deg);' +
      '    -webkit-transform: rotate(0deg);' +
      '    transform: rotate(0deg);' +
      '  }' +
      '  100% {' +
      '    -moz-transform: rotate(360deg);' +
      '    -ms-transform: rotate(360deg);' +
      '    -webkit-transform: rotate(360deg);' +
      '    transform: rotate(360deg);' +
      '  }' +
      '}' +
      '/* :not(:required) hides this rule from IE9 and below */' +
      '.spinner-loader:not(:required) {' +
      '  -moz-animation: spinner-loader 1500ms infinite linear;' +
      '  -webkit-animation: spinner-loader 1500ms infinite linear;' +
      '  animation: spinner-loader 1500ms infinite linear;' +
      '  -moz-border-radius: 0.5em;' +
      '  -webkit-border-radius: 0.5em;' +
      '  border-radius: 0.5em;' +
      '  -moz-box-shadow: rgba(0, 0, 51, 0.3) 1.5em 0 0 0, rgba(0, 0, 51, 0.3) 1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) 0 1.5em 0 0, rgba(0, 0, 51, 0.3) -1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) -1.5em 0 0 0, rgba(0, 0, 51, 0.3) -1.1em -1.1em 0 0, rgba(0, 0, 51, 0.3) 0 -1.5em 0 0, rgba(0, 0, 51, 0.3) 1.1em -1.1em 0 0;' +
      '  -webkit-box-shadow: rgba(0, 0, 51, 0.3) 1.5em 0 0 0, rgba(0, 0, 51, 0.3) 1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) 0 1.5em 0 0, rgba(0, 0, 51, 0.3) -1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) -1.5em 0 0 0, rgba(0, 0, 51, 0.3) -1.1em -1.1em 0 0, rgba(0, 0, 51, 0.3) 0 -1.5em 0 0, rgba(0, 0, 51, 0.3) 1.1em -1.1em 0 0;' +
      '  box-shadow: rgba(0, 0, 51, 0.3) 1.5em 0 0 0, rgba(0, 0, 51, 0.3) 1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) 0 1.5em 0 0, rgba(0, 0, 51, 0.3) -1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) -1.5em 0 0 0, rgba(0, 0, 51, 0.3) -1.1em -1.1em 0 0, rgba(0, 0, 51, 0.3) 0 -1.5em 0 0, rgba(0, 0, 51, 0.3) 1.1em -1.1em 0 0;' +
      '  display: inline-block;' +
      '  font-size: 10px;' +
      '  width: 1em;' +
      '  height: 1em;' +
      '  margin: 1.5em;' +
      '  overflow: hidden;' +
      '  text-indent: 100%;' +
      '}' +
      '.spinner-container {' +
      '  position: fixed;' +
      '  padding: 0;' +
      '  margin: 0;' +
      '  top: 0;' +
      '  left: 0;' +
      '  width: 100%;' +
      '  height: 100%;' +
      '  background: rgba(255, 255, 255, 0.8);' +
      '  z-index: 9999;' +
      '  display: table-cell;' +
      '  text-align: center;' +
      '  padding-top: 200px' +
      '}';
    document.body.appendChild(spinner);

    var spinnerContainer = document.createElement('div');
    spinnerContainer.className = 'spinner-container';
    spinnerContainer.innerHTML = '&nbsp;';
    document.body.appendChild(spinnerContainer);

    var spinnerLoader = document.createElement('div');
    spinnerLoader.className = 'spinner-loader';
    spinnerLoader.innerHTML = 'Loading...';
    spinnerContainer.appendChild(spinnerLoader);
  };

  window.ReceiptfulSpinner = {
    start: startSpinner
  };
})();

(function() {
  'use strict';

  var util = new window.ReceiptfulUtil();
  var cookies = new window.ReceiptfulCookies();
  var spinner = window.ReceiptfulSpinner;

  var query = util.getQuery();
  var redirectToCartUrl;

  if (query.rfcart) {
    redirectToCartUrl = '/cart/' + query.rfcart;

    spinner.start();
  }

  // 1. Initialize Receiptful. Use the current cart token from the cookie.
  // 2. Start fetching the actual cart token and update the settings with the
  // token. Sometimes the cart cookie is not always up-to-date.

  var errorHandler = function(err) {
    console.error(err);
  };

  // We can only initialize Receiptful if we have a Shopify object.
  if (typeof window.Shopify !== 'undefined') {
    var customer = null;
    var product = null;
    var cartProducts = null;
    var recommend = false;
    var cartToken = cookies.getItem('cart') || '';

    if (typeof window.ReceiptfulData !== 'undefined') {
      customer = window.ReceiptfulData.customer;
      product = window.ReceiptfulData.product;
      cartProducts = window.ReceiptfulData.cart;
      recommend = window.ReceiptfulData.recommend;
    }

    // If the product is null, try and fetch the product using the JavaScript API.
    // Otherwise just initialize Receiptful with the product and customer.
    // Hint: If we're on a product page, /products will be in the pathname on
    // shopify shops.
    if (product === null && window.location.pathname.indexOf('/products') >= 0) {
      util.request('GET', window.location.pathname + '.js', '', function(text) {
        try {
          var product = JSON.parse(text);
          if (typeof product.id !== 'undefined') {
            window.Receiptful.init({
              user: window.Shopify.shop,
              product: product.id,
              cart: cartProducts,
              recommend: recommend,
              token: cartToken
            });
          }
        } catch (e) {
          errorHandler(e);
        }
      }, errorHandler);
    } else {
      window.Receiptful.init({
        user: window.Shopify.shop,
        product: product,
        customer: customer,
        cart: cartProducts,
        recommend: recommend,
        token: cartToken
      });
    }
  }

  // If we're currently in the checkout mode, stop here.
  if (window.location.hostname === 'checkout.shopify.com') {
    return;
  }

  // Use the Shopify AJAX API to fetch the current cart. If the token is null,
  // post a fake update request which will force the token to be created.
  util.request('GET', '/cart.js', '', function(text) {
    try {
      var cart = JSON.parse(text);
      if (cart.token) {
        window.Receiptful.settings.token = cart.token;
        window.Receiptful.sendTrackingClickRequest(redirectToCartUrl);
        return;
      }
    } catch (e) {
      return errorHandler(e);
    }

    // Cart token could not be parsed, so try and update.
    util.request('POST', '/cart/update.js', '', function(text2) {
      try {
        var cart2 = JSON.parse(text2);
        window.Receiptful.settings.token = cart2.token;
        window.Receiptful.sendTrackingClickRequest(redirectToCartUrl);
      } catch (e) {
        errorHandler(e);
      }
    }, errorHandler);
  }, errorHandler);
})();
