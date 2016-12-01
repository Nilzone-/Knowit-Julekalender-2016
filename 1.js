(function () {
    var n = -1;
    for (n = 6;; n += 10) {
        if (n * 4 === parseInt(6 + '' + (n - 6) / 10)) break; 
    }
    console.log(n); 

})();
