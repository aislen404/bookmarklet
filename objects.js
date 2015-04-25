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

function TestPlan() {
    this.n_scripts = 0;

    this.runAll = function() {
        this.n_scripts = 7;
    };

    this.say = function() {
        log.add("I am a " + this.n_scripts + "-nºscript --> AllScripts");
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
    var prueba = new TestFactory();
    var allprueba = new FullTest();
    var resultado = prueba.construct(allprueba);


    resultado.say();

    log.show();
}
