$(document).ready(function(){

	$('#magicsuggest').magicSuggest();
	
	$(function () {
        $('.menu__sub').mouseover(function () {
            $('.invisibly').css("display", "block");
        });
        $('.menu__sub').mouseout(function () {
            $('.invisibly').css("display", "none");
        });
    })

});
