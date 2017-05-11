$(document).ready(function(){

	$('#magicsuggest').magicSuggest({
        hideTrigger: true
    });
	
	$(function () {
        $('.menu__sub').mouseover(function () {
            $('.invisibly').css("display", "block");
        });
        $('.menu__sub').mouseout(function () {
            $('.invisibly').css("display", "none");
        });
    });

    $(".header__nav-menu").click(function() {
        $(".menu__hidden").toggle('slow');
    });


});
