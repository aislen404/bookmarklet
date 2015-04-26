"use strict";




var check = function (website) {

    var w3cCheckUrl = 'http://validator.w3.org/check',
        defaultOutput = 'json',
        timeout = 15000; //15 secs of time to get an answer from W3C

    var resolved = false;
    var timeoutId = setTimeout(function () {
        resolved = true;

        var result = {
            testName: "w3c-validator",
            passed: false,
            data: ['Timeout']
        };

    }, timeout);

    var url = w3cCheckUrl + '?output=' + defaultOutput + '&uri=' + encodeURIComponent(website.url.href);

    console.log ("check-w3c-validator.js --> ", url);

    request.get(url, function (err, res, body) {
        var result;
        clearTimeout(timeoutId);

        if (resolved) {
            return;
        }

        if (err) {
            result = {
                testName: "w3c-validator",
                passed: false,
                data: ['Error']
            };
            deferred.resolve(result);
            return;
        }

        try {
            var content = JSON.parse(body);

            result = {
                testName: "w3c-validator",
                passed: content.messages.length === 0,
                data: content.messages
            };
        } catch (e) {
            result = {
                testName: "w3c-validator",
                passed: false,
                data: ['Remote error']
            };
        }
    });


    return 'W3C: ' + result.data + '\n' + 'Test Result: ' + result.passed;
};
