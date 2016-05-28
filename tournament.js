/**
 * Created by adam on 28-May-16.
 */
$(document).ready(function(){
    $("#newcode").hide();
    $('#run').hide();
    $("#help").hide();

});

function loadgame(){
    var gameName = document.getElementById('inputSuccess').value
    $("#gamename").hide();
    $("#newcode").show();
    $('#run').show();
    $("#help").show();
    init(gameName.hashCode(),gameName);


}

String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    console.log(hash);
    return hash;
};