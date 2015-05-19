/**
 * Created by Aislen404 on 25/4/15.
 * test scripting in bookmarklet
 * focused on the analisys of compatibility with IE11
 * allows you to check the page that you are just visiting
 */

var renderMode_Detection = function () {
    var _renderMode = document.compatMode === 'CSS1Compat' ? 'Standards' : 'Quirks';
    return 'Render Mode: ' + _renderMode;

};

var layoutEngine_Detection = function () {
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
            cssClass += '-11';
            jsObject = {
                vendor: ie,
                version: 11
            };
        }
        else if ('-ms-user-select' in style) {
            cssClass += '-10';
            jsObject = {
                vendor: ie,
                version: 10
            };
        }
        else if ('fill' in style) {
            cssClass += '-9';
            jsObject = {
                vendor: ie,
                version: 9
            };
        }
        else if ('widows' in style) {
            cssClass += '-8';
            jsObject = {
                vendor: ie,
                version: 8
            };
        }
        else {
            cssClass += '-7';
            jsObject = {
                vendor: ie,
                version: 7
            };
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
            };
        }
        else if (!!window.chrome || ua.indexOf('OPR') >= 0) {
            cssClass += browser + chrome;
            jsObject = {
                vendor: webkit,
                browser: chrome
            };
        }
        else if (!!window.wiiu) {
            cssClass += browser + wiiu;
            jsObject = {
                vendor: webkit,
                browser: wiiu
            };
        }
        else {
            jsObject = {
                vendor: webkit
            };
        }
    }
    // Mozilla
    else if ('MozAppearance' in style) {
        cssClass += mozilla;
        jsObject = {
            vendor: mozilla
        };
    }
    // Opera
    else if ('OLink' in style || !!window.opera) {
        cssClass += opera;
        if ('OMiniFold' in style) {
            cssClass += '-mini';
            jsObject = {
                vendor: opera,
                version: 'mini'
            };
        }
        else {
            jsObject = {
                vendor: opera
            };
        }
    }
    // KHTML
    else if ('KhtmlUserInput' in style) {
        cssClass += khtml;
        jsObject = {
            vendor: khtml
        };
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
    var val;
    this.compatibilityMode = false;

    // Detect whether or not the browser is IE
    var ieRegex = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
    if (ieRegex.exec(ua) === null){
        val = 'The user agent detected does not containt Internet Explorer.';
    }else{
        // Get the current 'emulated' version of IE
        this.renderVersion = parseFloat(RegExp.$1);
        this.version = this.renderVersion;

        // Check the browser version with the rest of the agent string to detect compatibility mode
        if (ua.indexOf('Trident/6.0') > -1) {
            if (ua.indexOf('MSIE 7.0') > -1) {
                this.compatibilityMode = true;
                this.version = 10;                  // IE 10
            }
        }
        else if (ua.indexOf('Trident/5.0') > -1) {
            if (ua.indexOf('MSIE 7.0') > -1) {
                this.compatibilityMode = true;
                this.version = 9;                   // IE 9
            }
        }
        else if (ua.indexOf('Trident/4.0') > -1) {
            if (ua.indexOf('MSIE 7.0') > -1) {
                this.compatibilityMode = true;
                this.version = 8;                   // IE 8
            }
        }
        else if (ua.indexOf('MSIE 7.0') > -1){
            this.version = 7;                       // IE 7
        }else{
            this.version = 6;                       // IE 6
        }

        val = 'IE' + this.version;
        if (this.compatibilityMode)
            val += ' Entering in Compatibility Mode (IE' + this.renderVersion + ' emulation)';
        return 'We have detected the following IE browser: ' + val;
    }
    return val;
};

var xUA_compatible_Detection = function () {

    var x = document.getElementsByTagName('META');
    var txt = '';
    var i;
    var count = 0;
    if (x.length === 0)
        txt = 'no META tags in page !!!';
    for (i = 0; i < x.length; i++) {
        if( x[i].httpEquiv.toString() === 'X-UA-Compatible'){
            txt = txt + '' + x[i].httpEquiv + ' content: ' + x[i].content;
            count += 1 ;
        }
    }

    if (count === 0){
        txt = 'NO X-UA-Compatible META in document';
    }
    return txt;
};

var doctype_Detection = function () {

    var response;

    if (document.all[0].nodeValue !== null){
        var re=/\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi;
        var myversionInfo = {
            xhtml : '',
            version: '',
            importance: ''
        };

        re.exec(document.all[0].nodeValue);

        myversionInfo.xhtml=RegExp.$1;
        myversionInfo.version=RegExp.$2;
        myversionInfo.importance=RegExp.$3;

        response = 'DOCTYPE: ' + myversionInfo.xhtml+' '+myversionInfo.version+' '+myversionInfo.importance ;
    }else{

        var spaces = '[\\s\\r\\n]*',
            comment = '(?:' + spaces + '<!--(?:.|[\\r\\n])*-->)*',
            xmltag = '(?:<\\?xml(?:.|[\\r\\n])*\\?>)?',
            doctype = '<!doctype (\\w+)' + spaces + '([^>]*)>',
            headRE = new RegExp('^' + comment + spaces + xmltag + spaces + doctype),
            pubsysRE = new RegExp('^(public|system)' + spaces + '"([^"]*)"' + spaces + '("[^"]*")?'),
            pubidRE = new RegExp('-//w3c//dtd (x?html)\\S*\\s*([\\d\\.]+)?\\s*(\\w+)?//en'),
            pubidMap = {
                'iso/iec 15445:1999//dtd hypertext markup language//en': true,
                'iso/iec 15445:1999//dtd html//en': true,
                '-//ietf//dtd html i18n//en': true,
                '-//unknown//en': true
            };

        var ns = new XMLSerializer();
        var website= ns.serializeToString(document);

        var head = website.slice(0, 2000).trim().toLowerCase(),
            dt = headRE.exec(head),
            result = {
                testName: 'doctype',
                passed: false,
                data: {
                    lineNumber: -1,
                    mode : [ 'No doctype' ]
                }
            };

        if (dt) {
            // Since the regexp matched this should succeed as well
            result.data.lineNumber = head.substr(0,head.indexOf('<!doctype')).split('\n').length;
            if ( dt[1] !== 'html' ) {
                // probably something like <!doctype svg ...> or other non-html, we don't want to error on these
                result.passed = true;
                result.data.mode = [ (dt[1] || 'Unknown') + ' (non-HTML)' ];
            } else if ( !dt[2] ) {
                // <!doctype html> (plain old html5 doctype without any following junk)
                result.passed = true;
                result.data.mode = [ 'html5' ];
            } else {
                // Assume failure for simplicity
                result.data.mode = [ 'Invalid or Quirks doctype' ];

                // Should have PUBLIC or SYSTEM plus identifier(s)
                var pubsys = pubsysRE.exec(dt[2]) || [],
                    puborsys = pubsys[1],
                    pubid = pubsys[2],
                    sysid = pubsys[3];

                if ( puborsys === 'system' ) {
                    // Any SYSTEM doctypes are considered to be standards mode
                    result.passed = true;
                    result.data.mode = [ 'html (system)' ];
                } else  if ( pubid === '' && sysid === undefined ) {
                    // <!doctype public ''> is standards mode
                    result.passed = true;
                    result.data.mode = [ 'html5 (long form)' ];
                } else if ( pubidMap[pubid] ) {
                    // One of the 'OMG standards mode' bizarro doctypes
                    result.passed = true;
                    result.data.mode = [ 'html standards' ];
                } else if ( pubsys.length && pubid ) {
                    // Drill into the pubid to see if it's standards mode
                    var pubdata = pubidRE.exec(pubid) || [],
                        htmltype = pubdata[1],
                        version = pubdata[2],
                        variant = pubdata[3],
                        standards = pubdata.length > 0;

                    if ( htmltype === 'html' ) {
                        if ( +version < 4.0 ) {
                            // Anything less than HTML4 is not standards
                            standards = false;
                        } else if ( version === '4.0' || version === '4.01' ) {
                            // HTML4 is only standards for frameset/transitional if a system id is provided
                            if ( /frameset|transitional/.test(variant) && !sysid ) {
                                standards = false;
                            }
                        }
                    }
                    result.passed = standards;
                    result.data.mode = [(htmltype + ' ' + version + ' ' + variant).trim()];
                }
            }
        }
        response = 'DOCTYPE: ' + result.data.mode ;
    }

    return response;
};

var log = (function () {
    var log = [];
    return {
        add: function (msg) { log.push(msg); },
        show: function () { return log; }
    };
})();

/* main program */
var  run_test_suite = function () {

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


    return log.show();
};

/* lanzador */
function execute_test_suite(){

    loadCSS();

    var resultado = run_test_suite();

    drawResults();

    for (var item in resultado) {
        var node = document.createElement('li');                 // Create a <li> node
        var textnode = document.createTextNode(resultado[item]);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById('testResults').appendChild(node);     // Append <li> to <ul> with id='myList'
        console.log(resultado[item]);
    }
}

function loadCSS(){

    var css =  '.modalDialog{position:fixed;font-family:Arial,Helvetica,sans-serif;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.8);z-index:99999;visibility:visible}.modalDialog>div{width:400px;position:relative;margin:10% auto;padding:5px 20px 13px;border-radius:10px;background:#fff;background:-moz-linear-gradient(#fff,#999);background:-webkit-linear-gradient(#fff,#999);background:-o-linear-gradient(#fff,#999)}.close{background:#606061;color:#FFF;line-height:25px;position:absolute;right:-12px;text-align:center;top:-10px;width:24px;text-decoration:none;font-weight:700;-webkit-border-radius:12px;-moz-border-radius:12px;border-radius:12px;-moz-box-shadow:1px 1px 3px #000;-webkit-box-shadow:1px 1px 3px #000;box-shadow:1px 1px 3px #000}.close:hover{background:#00d9ff}';
    head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

}

function drawResults (){
    var _body = document.getElementsByTagName('body');
    var _div = document.createElement('div');
    _div.innerHTML = '<div id="openModal" class="modalDialog" style="visibility: hidden">' +
        '<div>	<a id="close_btn" href="javascript:(function(){toggle_visibility();})()" title="Close" class="close">X</a>' +
        '<ul id="testResults">' +
        '</ul>' +
        '</div>' +
        '</div>' ;
    _body[0].appendChild(_div);
}

function toggle_visibility() {
    console.log('a ver que pasa por aqui');
    el = document.getElementById('openModal');
    el.style.visibility = (el.style.visibility == 'visible') ? 'hidden' : 'visible';
}

execute_test_suite();
