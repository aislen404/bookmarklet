/**
 * Created by Aislen404 on 25/4/15.
 */
function bookmarklet() {
    function callback() {
        run();
    }

    var s = document.createElement("script");
    s.src = "https://raw.githubusercontent.com/aislen404/bookmarklet/master/test.js";

    var l = document.createEken


    if (s.addEventListener) {
        s.addEventListener("load", callback, false)
    } else if (s.readyState) {
        s.onreadystatechange = callback(s);
    }
    document.body.appendChild(s);
}

