$(document).ready(function(){


	// SEARCH INPUT
	$('#magicsuggest').magicSuggest({
        hideTrigger: true
    });
	// SERCH INPUT END
	
	// SHADOW BLOCK
	$(function () {
        $('.menu__sub').mouseover(function () {
            $('.invisibly').css("display", "block");
        });
        $('.menu__sub').mouseout(function () {
            $('.invisibly').css("display", "none");
        });
    });
	// SHADOW BLOCK END

	//  OPEN MENU
    $(".header__nav-menu").click(function() {
        $(".menu__hidden").toggle('slow');
    });
    // OPEN MENU END

});
