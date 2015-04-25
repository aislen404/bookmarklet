/**
 * Created by Aislen404 on 25/4/15.
 * test scripting in bookmarklet
 * focused on the analisys of compatibility with IE11
 * allows you to check the page that you are just visiting
 */

/*constructs test plans by using the fullTest(plan) o SpecificTest(plan) interface*/
function TestFactory() {
    this.construct = function(testPlan) {
        testPlan.execute();
        return testPlan.get();
    }
}

/* fullTest(plan) interface */
function FullTest() {
    this.AllScripts = null;

    this.execute = function() {
        this.AllScripts = new TestSets();
        this.AllScripts.runAll();
    };

    this.get = function() {
        return this.AllScripts;
    };
}

/* Specific(plan) interface */
function SpecificTest(whatTest){
    this.ThatScript = null;

    this.execute = function() {
        this.ThatScript = new TestSets();
        this.ThatScript.runEspecific(whatTest);
    };

    this.get = function() {
        return this.ThatScript;
    };
}

/* controls the execution and feedback of the script test to being tested */
function TestSets() {
    this.n_scripts = 0;

    this.runAll = function() {
        this.n_scripts = 'all';
    };

    this.runEspecific = function (wT){
        this.n_scripts = wT.execTest();
    };

    this.feedback = function() {
        log.add("I am a " + this.n_scripts + " nºscript");
    };
}

check_browser_detection = function () {

    this.execTest = function(){
        var _renderMode = document.compatMode==='CSS1Compat'?'Standards':'Quirks';
        log.add('Render Mode: ' + _renderMode);
        return 'OK de PUTA MADRE';
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
    var testFactory = new TestFactory();
    var testPlans = [
        'check_browser_detection',
        'check_compatlist',
        'check_compressedcontent',
        'check_doctype',
        'check_libs',
        'check_pluginfree',
        'check_w3c_validator'
    ];

    var all = new FullTest();
    var specific = new SpecificTest(testPlans[0]);

    var test_4_all = testFactory.construct(all);
    var test_4_specific = testFactory.construct(specific);

    test_4_all.feedback();
    test_4_specific.feedback();
    log.show();
}
