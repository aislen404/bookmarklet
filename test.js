function TestFactory() {
    this.construct = function(__testPlan) {
        __testPlan.execute();
        return __testPlan.get();
    }
}

function FullTest() {
    this.AllScripts = null;

    this.execute = function() {
        this.AllScripts = new TestPlan();
        this.AllScripts.runAll();
    };

    this.get = function() {
        return this.AllScripts;
    };
}

function EspecificTest(){
    this.ThatScript = null;

    this.execute = function() {
        this.ThatScript = new TestPlan();
        this.ThatScript.runEspecific();
    };

    this.get = function() {
        return this.ThatScript;
    };
}

function TestPlan() {
    this.n_scripts = 0;

    this.runAll = function() {
        this.n_scripts = 'all';
    };

    this.runEspecific = function (){
        this.n_scripts = 'check_browser_detection';
    };

    this.say = function() {
        log.add("I am a " + this.n_scripts + " nºscript");
    };
}


// log helper
var log = (function () {
    var log = "";
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();

function run() {
    var testFactory = new TestFactory();

    var all_prueba = new FullTest();
    var especific_prueba = new EspecificTest();
    //TODO: Meter como parametro el test plan especifico.



    var resultado_all_prueba = testFactory.construct(all_prueba);
    var resultado_especific_prueba = testFactory.construct(especific_prueba);

    resultado_all_prueba.say();
    resultado_especific_prueba.say();
    log.show();
}
