//========================================================================================================================================
//
// Finn det minste naturlige tallet som ender på 6 og som har følgende egenskap:
// - hvis man fjerner det siste tallet og plasserer det først så blir tallet fire ganger så stort som det opprinnelige tallet.
//
//========================================================================================================================================



(function () {
    var n = -1;
    for (n = 6;; n += 10) {
        if (n * 4 === parseInt(6 + '' + (n - 6) / 10)) break; 
    }
    console.log(n); 

})();
