/**
 * Created by Aislen404 on 25/4/15.
 */
function bookmarklet() {


    var s = document.createElement("script");
    s.type = 'text/javascript';
    s.src = "https://raw.githubusercontent.com/aislen404/bookmarklet/master/test_3.js";

    if (s.addEventListener) {
        s.addEventListener("load", callback(), false)
    } else if (s.readyState) {
        s.onreadystatechange = callback();
    }
    document.body.appendChild(s);

    function callback() {
        execute_test_suite();
    }
}