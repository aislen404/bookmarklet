/**
 * Created by Aislen404 on 25/4/15.
 */
function bookmarklet() {
    function callback() {
        execute_test_suite();
    }

    var headID = document.getElementsByTagName('head')[0];
    var cssNode = document.createElement('link');

    cssNode.type = 'text/css';
    cssNode.rel = 'stylesheet';
    cssNode.href = 'https://raw.githubusercontent.com/aislen404/bookmarklet/master/modal.css';
    cssNode.media = 'screen';
    headID.appendChild(cssNode);

    var jsNode = document.createElement('script');
    jsNode.type = 'text/javascript';
    jsNode.onload=callback();
    jsNode.src = 'https://raw.githubusercontent.com/aislen404/bookmarklet/master/test_2.js';
    headID.appendChild(jsNode);

}

