/**
 * Created by Aislen404 on 06/05/15.
 */
javascript:(function(){
    if (document.getElementById('openModal') === null){
        var s = document.createElement('script');
        s.type = 'application/javascript';
        s.src = 'https://raw.githubusercontent.com/aislen404/bookmarklet/master/test_4.js';
        s.defer = true;
        document.body.appendChild(s);
    }else{
        toggle_visibility();
    }
})()

