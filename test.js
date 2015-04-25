function TestFactory() {
    this.testPlan = function(test) {
        test.execute();
        return test.get();
    }
}

function fullTest () {
    this.test = 0;

    this.execute = function() {
        this.test = new Step();
    };

    this.get = function() {
        return this.test;
    };
}


function Step() {
    this.result = 0;
    this.say = function() {
        log.add("I am a " + this.result );
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

    var testing = testFactory.testPlan(fullTest);

    testing.say();
    log.show();
}
