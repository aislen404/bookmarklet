/*
* test es un objeto (var) y no un constructor (function) por que solo
* queremos manejar un solo objeto de tipo test
*
*/


test = function(){
    this.testScript = {
        0:'check-browser-detection.js',
        1:'check-compatlist.js',
        2:'check-compressedcontent.js',
        3:'check-doctype.js',
        4:'check-libs.js',
        5:'check-pluginfree.js',
        6:'check-w3c-validator.js'
    };

    createTest = function (){
        alert (this.testScript[0]);
    };

    return this;
};


