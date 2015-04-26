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

    var val = "IE" + this.version;
    if (this.compatibilityMode)
        val += " Compatibility Mode (IE" + this.renderVersion + " emulation)";
        return "We have detected the following IE browser: " + val;
};
 
var xUA_compatible_Detection = function () {

    var x = document.getElementsByTagName("META");
    var txt = "";
    var i;
    for (i = 0; i < x.length; i++) {
        txt = txt + 'http-equiv: '+ x[i].httpEquiv + ' content: ' + x[i].content + '\n';
    }

   return txt;
};

var check = function () {

    var spaces = '[\\s\\r\\n]*',
        comment = '(?:' + spaces + '<!--(?:.|[\\r\\n])*-->)*',
        xmltag = '(?:<\\?xml(?:.|[\\r\\n])*\\?>)?',
        doctype = '<!doctype (\\w+)' + spaces + '([^>]*)>',
// _, doctype-innards
        headRE = new RegExp('^' + comment + spaces + xmltag + spaces + doctype),
// _, public|system, "public identifier", "system identifier"?
        pubsysRE = new RegExp('^(public|system)' + spaces + '"([^"]*)"' + spaces + '("[^"]*")?'),
// _, (x)html, version, variant (e.g., "transitional")
        pubidRE = new RegExp('-//w3c//dtd (x?html)\\S*\\s*([\\d\\.]+)?\\s*(\\w+)?//en'),
// Literal pubids that pass standards
        pubidMap = {
            "iso/iec 15445:1999//dtd hypertext markup language//en": true,
            "iso/iec 15445:1999//dtd html//en": true,
            "-//ietf//dtd html i18n//en": true,
            "-//unknown//en": true
        };

    //TODO: revisa esta linea antes de publicar.
    var ns = new XMLSerializer();
    var website= ns.serializeToString(document);

    // Don't waste time looking through the whole doc; the doctype should be early
    var head = website.slice(0, 2000).trim().toLowerCase(),
        dt = headRE.exec(head),
        result = {
            testName: "doctype",
            passed: false,
            data: {
                lineNumber: -1,
                mode : [ "No doctype" ]
            }
        };

    if (dt) {
        // Since the regexp matched this should succeed as well
        result.data.lineNumber = head.substr(0,head.indexOf("<!doctype")).split('\n').length;
        if ( dt[1] !== "html" ) {
            // probably something like <!doctype svg ...> or other non-html, we don't want to error on these
            result.passed = true;
            result.data.mode = [ (dt[1] || "Unknown") + " (non-HTML)" ];
        } else if ( !dt[2] ) {
            // <!doctype html> (plain old html5 doctype without any following junk)
            result.passed = true;
            result.data.mode = [ "html5" ];
        } else {
            // Assume failure for simplicity
            result.data.mode = [ "Invalid or Quirks doctype" ];

            // Should have PUBLIC or SYSTEM plus identifier(s)
            var pubsys = pubsysRE.exec(dt[2]) || [],
                puborsys = pubsys[1],
                pubid = pubsys[2],
                sysid = pubsys[3];

            if ( puborsys === "system" ) {
                // Any SYSTEM doctypes are considered to be standards mode
                result.passed = true;
                result.data.mode = [ "html (system)" ];
            } else  if ( pubid === "" && sysid === undefined ) {
                // <!doctype public ""> is standards mode
                result.passed = true;
                result.data.mode = [ "html5 (long form)" ];
            } else if ( pubidMap[pubid] ) {
                // One of the "OMG standards mode" bizarro doctypes
                result.passed = true;
                result.data.mode = [ "html standards" ];
            } else if ( pubsys.length && pubid ) {
                // Drill into the pubid to see if it's standards mode
                var pubdata = pubidRE.exec(pubid) || [],
                    htmltype = pubdata[1],
                    version = pubdata[2],
                    variant = pubdata[3],
                    standards = pubdata.length > 0;

                if ( htmltype === "html" ) {
                    if ( +version < 4.0 ) {
                        // Anything less than HTML4 is not standards
                        standards = false;
                    } else if ( version === "4.0" || version === "4.01" ) {
                        // HTML4 is only standards for frameset/transitional if a system id is provided
                        if ( /frameset|transitional/.test(variant) && !sysid ) {
                            standards = false;
                        }
                    }
                }
                result.passed = standards;
                result.data.mode = [(htmltype + " " + version + " " + variant).trim()];
            }
        }
    }


    return result.data.mode+' pollardas';
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

    //log.add(renderMode_Detection());
    //log.add(doctype_Detection());
    //log.add(layoutEngine_Detection());
    //log.add(xUA_compatible_Detection());
    //log.add(ieUserAgent_Detection());
    log.add(check());


    log.show();
}
