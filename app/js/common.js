$(document).ready(function(){
	
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

// http://jsfiddle.net/mekwall/sgxKJ/
$.widget("ui.autocomplete", $.ui.autocomplete, {
    options: $.extend({}, this.options, {
        multiselect: false
    }),
    _create: function () {
        this._super();
        var self = this,
            o = self.options;
        if (o.multiselect) {
            console.log('multiselect true');
            self.selectedItems = {};
            self.multiselect = $("<div></div>")
                .addClass("ui-autocomplete-multiselect ui-state-default ui-widget")
                .css("width", self.element.width())
                .insertBefore(self.element)
                .append(self.element)
                .bind("click.autocomplete", function () {
                    self.element.focus();
                });
            var fontSize = parseInt(self.element.css("fontSize"), 10);
            function autoSize(e) {
                // Hackish autosizing
                var $this = $(this);
                $this.width(1).width(this.scrollWidth + fontSize - 1);
            };
            var kc = $.ui.keyCode;
            self.element.bind({
                "keydown.autocomplete": function (e) {
                    if ((this.value === "") && (e.keyCode == kc.BACKSPACE)) {
                        var prev = self.element.prev();
                        delete self.selectedItems[prev.text()];
                        prev.remove();
                    }
                },
                // TODO: Implement outline of container
                "focus.autocomplete blur.autocomplete": function () {
                    self.multiselect.toggleClass("ui-state-active");
                },
                "keypress.autocomplete change.autocomplete focus.autocomplete blur.autocomplete": autoSize
            }).trigger("change");

            // TODO: There's a better way?
            o.select = o.select || function (e, ui) {
                    var dupval = [];
                    $(".ui-autocomplete-multiselect-item").each(function (index, element) {
                        var replaced3 = $(this).html().replace('<span class="ui-icon ui-icon-close"></span>', '');
                        dupval.push(replaced3);
                    });
                    var trimlabel = $.trim(ui.item.label);
                    var arraysplit = trimlabel.split(' ');
                    $.each(arraysplit, function (i, val) {
                        if ($.inArray(val, dupval) === -1) {
                            $("<div></div>").addClass("ui-autocomplete-multiselect-item").text(val).append($("<span></span>").addClass("ui-icon ui-icon-close").click(function () {
                                    var item = $(this).parent();
                                    var ss = item.text();
                                    delete self.selectedItems[item.text()];
                                    item.remove();
                                    var hs = $("#multiplesearch").val();
                                    
                                    var result = "," + hs + ",";
                                    result = result.replace("," + ss + ",", ",");
                                    result = result.substr(1, result.length);
                                    result = result.substr(0, result.length - 1);
                                    result = $.trim(result);

                                    $("#multiplesearch").val(result);
                                }))
                                .insertBefore(self.element);
                            self.selectedItems[val] = ui.item;
                        }
                    });

                    self._value("");
                    return false;
                }
            var searchvalues = $("#search_values").val();
            if ((searchvalues == "") || (searchvalues === undefined)) {
            } else {
                var arrS = searchvalues.split(',');
                var search_htmlss = "";
                $.each(arrS, function (key, value) {
                    search_htmlss += ($("<div></div>").addClass("ui-autocomplete-multiselect-item").text(value).append($("<span></span>").addClass("ui-icon ui-icon-close").click(function () {
                        var item = $(this).parent();
                        var ss = item.text();
                        delete self.selectedItems[item.text()];
                        item.remove();
                        var hs = $("#multiplesearch").val();
                        var result = "," + hs + ",";
                        result = result.replace("," + ss + ",", ",");
                        result = result.substr(1, result.length);
                        result = result.substr(0, result.length - 1);
                        result = $.trim(result);
                        /* var newArr = $.unique(result.sort()).sort();
                         var results = "";
                         for (var i = 0; i < newArr.length; i++) {
                         results += newArr[i] + ",";
                         }
                         result = results.slice(0, -1);*/
                        $("#multiplesearch").val(result);
                    }))).insertBefore($("#searchtxt"));
                });
            }

            /* var mhtml5 =[];
             $( ".ui-autocomplete-multiselect-item" ).each(function( index, element ) {
             var replaced5 = $(this).html().replace('<span class="ui-icon ui-icon-close"></span>','');
             mhtml5.push(replaced5);
             });

             var arraysplit5 =[];
             arraysplit5 = searchvalues.split(',');
             alert(arraysplit5);
             if ($.inArray(arraysplit5, mhtml5) !== -1){
             alert("ll");
             }*/
            /*self.options.open = function(e, ui) {
             var pos = self.multiselect.position();
             pos.top += self.multiselect.height();
             self.menu.element.position(pos);
             }*/
        }

        return this;
    }
});

$(document).ready(function () {
        /*  var currentpage = $('#currentpage').val();
         if (currentpage == "advance_search.php") {
         $('#advsearch_div').show();
         }
         else {
         $('#advsearch_div').hide();
         }*/

        $('#advsearch_down').click(function () {
            $('#advsearch_div').toggle("slide");
        });

        $('#search_close').click(function () {
            $('#advsearch_div').toggle("slide");
        });
    });
    $(function () {
        $('#btnSearch').click(function () {
            
             if($("#multiplesearch").val()==""){ $("input#subCat").val(0);}
             var frm = $('#frmSearch').serialize();
            window.location = 'https://www.collllor.com/search_product_list.php?' + frm;
            return false;
        });
        $(function () {
            var cache = {};
            var $project = $('#searchtxt');

            function highlightText(text, $node) {
                var searchText = $.trim(text).toLowerCase(),
                    currentNode = $node.get(0).firstChild,
                    matchIndex,
                    newTextNode,
                    newSpanNode;
                while ((matchIndex = currentNode.data.toLowerCase().indexOf(searchText)) >= 0) {
                    newTextNode = currentNode.splitText(matchIndex);
                    currentNode = newTextNode.splitText(searchText.length);
                    newSpanNode = document.createElement("span");
                    newSpanNode.className = "highlight";
                    currentNode.parentNode.insertBefore(newSpanNode, currentNode);
                    newSpanNode.appendChild(newTextNode);
                }
            }
            // FOR TEST
            var availableTags = [
                    "ActionScript",
                    "AppleScript",
                    "Asp",
                    "BASIC",
                    "C",
                    "C++",
                    "Clojure",
                    "COBOL",
                    "ColdFusion",
                    "Erlang",
                    "Fortran",
                    "Groovy",
                    "Haskell",
                    "Java",
                    "JavaScript",
                    "Lisp",
                    "Perl",
                    "PHP",
                    "Python",
                    "Ruby",
                    "Scala",
                    "Scheme"
                    ];

            $project.autocomplete({
            minLength: 1,
                source: availableTags,
                // source: function (request, response) {
                    // request.term = request.term + "|" + $("#search_cat").val();
                    // var term = request.term;
                    // if (term in cache) {
                        // response(cache[term]);
                        // return;
                    // }
                    // $.getJSON("https://www.collllor.com/SearchProduct.php", request, function (data, status, xhr) {
                        // cache[term] = data;
                        // response(data);
                    // });
                // },

                focus: function (event, ui) {
                    var mhtml = [];
                    var trimlabel2 = $.trim(ui.item.value);
                    var subcatid2 = $.trim(ui.item.subcatid);
                    var arraysplit2 = trimlabel2.split(' ');
                    $.each(arraysplit2, function (i, val) {
                        mhtml.push(val);
                        $(".ui-autocomplete-multiselect-item").each(function (index, element) {
                            var replaced = $(this).html().replace('<span class="ui-icon ui-icon-close"></span>', '');
                            mhtml.push(replaced);
                        });
                    });

                    $("input#subCat").val(subcatid2);
                    var newArr = $.unique(mhtml.sort()).sort();
                    var result = "";
                    for (var i = 0; i < newArr.length; i++) {
                        result += newArr[i] + ",";
                    }
                    mhtml = result.slice(0, -1) //remove last comma
                    $("#multiplesearch").val(mhtml);
                    if ($("#multiplesearch").val() != "") {
                        $('#searchtxt').removeAttr('placeholder');
                        $('span').removeClass('placeholder');
                        
                        // $('#searchtxt').attr('style', 'width: 30px !important');
                    }
                },
                multiselect: true
            });

            $project.data("ui-autocomplete")._renderItem = function (ul, item) {
                if (item.icon != undefined) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append("<a>" + "<img src='https://www.collllor.com/phpThumb/phpThumb.php?src=../uploads/product/" + item.icon + "&w=50&h=50&far=1&bg=#E6E6E6' /><span>" + item.label + "</span></a>")
                        .appendTo(ul);
                }
                if (item.subcateg != undefined) {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append($("<li class='subcatname'></li>").text(item.subcateg))
                        .appendTo(ul);
                }
                if (item.value == "") {
                    return $("<li></li>")
                        .data("item.autocomplete", item)
                        .append($("<div class='popular'></div>").text(item.label))
                        .appendTo(ul);
                } else {
                    var $a = $("<a></a>").text(item.label);
                    highlightText(this.term, $a);
                    return $("<li></li>").append($a).appendTo(ul);

                }
            };
        });
    });