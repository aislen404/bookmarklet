function polpot() {
    "use strict";
    var test = {
        testScript: {
            0:'check-browser-detection.js',
            1:'check-compatlist.js',
            2:'check-compressedcontent.js',
            3:'check-doctype.js',
            4:'check-libs.js',
            5:'check-pluginfree.js',
            6:'check-w3c-validator.js'

        }
    };

    var TestSuite = function() {
        alert(test.testScript[0]());
    };

    test.createTest = function() {
        return new TestSuite();
    };

    return test;
};
