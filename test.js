/**
 * Created by Aislen404 on 25/4/15.
 * test scripting in bookmarklet
 * focused on the analisys of compatibility with IE11
 * allows you to check the page that you are just visiting
 */


var renderMode_Detection = function() {
    var _renderMode = document.compatMode === 'CSS1Compat' ? 'Standards' : 'Quirks';
    return 'Render Mode: '+_renderMode;

};

var doctype_Detection = function(){
    var _node = document.doctype;
    var _html = "<!DOCTYPE "
        + _node.name
        + (_node.publicId ? ' PUBLIC "' + _node.publicId + '"' : '')
        + (!_node.publicId && _node.systemId ? ' SYSTEM' : '')
        + (_node.systemId ? ' "' + _node.systemId + '"' : '')
        + '>';
    return 'DocType: ' + _html;
};

var layoutEngine_Detection = function() {
    var html = document.documentElement,
        style = html.style,
        vendor = ' vendor-',
        ie = 'ie',
        khtml = 'khtml',
        mozilla = 'mozilla',
        opera = 'opera',
        webkit = 'webkit',
        browser = ' browser-',
        android = 'android',
        chrome = 'chrome',
        wiiu = 'wiiu',
        cssClass = vendor,
        jsObject;

    // IE
    if ('-ms-scroll-limit' in style || 'behavior' in style) {
        cssClass += ie + vendor + ie;
        if ('-ms-ime-align' in style) {
            cssClass += '-11'
            jsObject = {
                vendor: ie,
                version: 11
            }
        }
        else if ('-ms-user-select' in style) {
            cssClass += '-10'
            jsObject = {
                vendor: ie,
                version: 10
            }
        }
        else if ('fill' in style) {
            cssClass += '-9';
            jsObject = {
                vendor: ie,
                version: 9
            }
        }
        else if ('widows' in style) {
            cssClass += '-8';
            jsObject = {
                vendor: ie,
                version: 8
            }
        }
        else {
            cssClass += '-7';
            jsObject = {
                vendor: ie,
                version: 7
            }
        }
    }
    // WebKit
    else if ('WebkitAppearance' in style) {
        cssClass += webkit;
        var ua = navigator.userAgent;

        if (ua.indexOf('Android') >= 0 && ua.indexOf('Chrome') === -1) {
            cssClass += browser + android;
            jsObject = {
                vendor: webkit,
                browser: android
            }
        }
        else if (!!window.chrome || ua.indexOf('OPR') >= 0) {
            cssClass += browser + chrome;
            jsObject = {
                vendor: webkit,
                browser: chrome
            }
        }
        else if (!!window.wiiu) {
            cssClass += browser + wiiu;
            jsObject = {
                vendor: webkit,
                browser: wiiu
            }
        }
        else {
            jsObject = {
                vendor: webkit
            }
        }
    }
    // Mozilla
    else if ('MozAppearance' in style) {
        cssClass += mozilla;
        jsObject = {
            vendor: mozilla
        }
    }
    // Opera
    else if ('OLink' in style || !!window.opera) {
        cssClass += opera;
        if ('OMiniFold' in style) {
            cssClass += '-mini';
            jsObject = {
                vendor: opera,
                version: 'mini'
            }
        }
        else {
            jsObject = {
                vendor: opera
            }
        }
    }
    // KHTML
    else if ('KhtmlUserInput' in style) {
        cssClass += khtml;
        jsObject = {
            vendor: khtml
        }
    }
    else {
        return false;
    }

    html.className += cssClass;

    return 'Browser: '+jsObject.vendor+' Version: '+jsObject.version;
};

var ieUserAgent_Detection = function (){

    // Get the user agent string
    var ua = navigator.userAgent;

    this.compatibilityMode = false;

    // Detect whether or not the browser is IE
    var ieRegex = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (ieRegex.exec(ua) == null)
        this.exception = "The user agent detected does not contai Internet Explorer.";

    // Get the current "emulated" version of IE
    this.renderVersion = parseFloat(RegExp.$1);
    this.version = this.renderVersion;

    // Check the browser version with the rest of the agent string to detect compatibility mode
    if (ua.indexOf("Trident/6.0") > -1) {
        if (ua.indexOf("MSIE 7.0") > -1) {
            this.compatibilityMode = true;
            this.version = 10;                  // IE 10
        }
    }
    else if (ua.indexOf("Trident/5.0") > -1) {
        if (ua.indexOf("MSIE 7.0") > -1) {
            this.compatibilityMode = true;
            this.version = 9;                   // IE 9
        }
    }
    else if (ua.indexOf("Trident/4.0") > -1) {
        if (ua.indexOf("MSIE 7.0") > -1) {
            this.compatibilityMode = true;
            this.version = 8;                   // IE 8
        }
    }
    else if (ua.indexOf("MSIE 7.0") > -1){
        this.version = 7;                       // IE 7
    }else{
        this.version = 6;                       // IE 6
    }

    var val = "IE" + ieUserAgent.version;
    if (ieUserAgent.compatibilityMode)
        val += " Compatibility Mode (IE" + ieUserAgent.renderVersion + " emulation)";
        return "We have detected the following IE browser: " + val;
};

var xUA_compatible_Detection = function () {
    return 'x-ua-compatible: ' + document.getElementsByTagName('meta')[0];
};


/* feedback helper */
var log = (function () {
    var log = "";
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

/* main program */
function run() {

    var testSuite = [
        'check_browser_detection',
        'check_compatlist',
        'check_compressedcontent',
        'check_doctype',
        'check_libs',
        'check_pluginfree',
        'check_w3c_validator'
    ];

    log.add(renderMode_Detection());
    log.add(doctype_Detection());
    log.add(layoutEngine_Detection());
    log.add(xUA_compatible_Detection());
    log.add(ieUserAgent_Detection());


    log.show();
}
