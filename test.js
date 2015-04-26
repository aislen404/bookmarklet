/**
 * Created by Aislen404 on 25/4/15.
 * test scripting in bookmarklet
 * focused on the analisys of compatibility with IE11
 * allows you to check the page that you are just visiting
 */



check_browser_detection = function() {
    var _renderMode = document.compatMode === 'CSS1Compat' ? 'Standards' : 'Quirks';
    return 'Render Mode: '+_renderMode;

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
    log.add(check_browser_detection());



    log.show();
}
