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
    init(gameName.length,gameName);


}