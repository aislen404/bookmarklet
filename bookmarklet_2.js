/**
 * Created by Aislen404 on 25/4/15.
 */
function bookmarklet() {
    function callback() {
        execute_test_suite();
    }

    var s = document.createElement("script");
    s.src = "https://raw.githubusercontent.com/aislen404/bookmarklet/master/test_2.js";

    var l = document.createElement("link");
    l.href="https://raw.githubusercontent.com/aislen404/bookmarklet/master/modal.css";


    if (s.addEventListener) {
        s.addEventListener("load", callback, false)
    } else if (s.readyState) {
        s.onreadystatechange = callback(s);
    }
    document.body.appendChild(s);
    document.body.appendChild(l);
}

