function validate() {
    var missinginputs = "";

    if ($('#contactname').val().length == 0) {
        missinginputs = "Your Name, ";
    }

    if ($('#contactcompany').val().length == 0) {
        missinginputs = missinginputs + "Your Company, ";
    }

    if ($('#contactemail').val().length == 0) {
        missinginputs = missinginputs + "Your E-mail, ";
    }

    if ($('#messagearea').val().length == 0) {
        missinginputs = missinginputs + "Your Message.";
    }

    if (missinginputs.length > 0) {
        $('#messagetext').text("Please fill in the following: " + missinginputs);
        $('#messagebox').fadeIn("slow");
        return false;
    }

}

function AnimatedRotateObject(d, obj) {
    var currotation = getRotationDegrees($(obj));

    $({ deg: 0 }).animate({ deg: d }, {
        step: function (now, fx) {
            now = now + currotation;
            $(obj).css({
                transform: "rotate(" + now + "deg)"
            });
        }
    });
}

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform") ||
        obj.css("-ms-transform") ||
        obj.css("-o-transform") ||
        obj.css("transform");
    if (matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

function autosize() {
    var messagearea = this;
    setTimeout(function () {
        if (messagearea.scrollHeight > 120) {
            messagearea.style.cssText = 'height:auto; padding:0';
            messagearea.style.cssText = 'height:' + (messagearea.scrollHeight + 20) + 'px';
        }
        if (messagearea.scrollHeight < 120) {
            messagearea.style.cssText = 'height:auto; padding:0';
            messagearea.style.cssText = 'height:' + 120 + 'px';
        }
    }, 0);
}

function projdetails(description, github, title, background) {

    $('#messagecontenttitle').text(title);

    $("#messagetext").css("background", "url('/images/" + background + "') no-repeat center");
    $("#messagetext").css("background-size", "contain");
    $("#messagetext").css("background-color", "rgba(255, 255, 255, 0.7)");
    $("#messagetext").css("background-blend-mode", "lighten");

    $('#messagetext').text(description);
    if (github.length > 0) {
        $("#messagelink").attr("href", github)
        $('#messagelink').text('Follow on GitHub');
        $('#messagelink').fadeIn("slow");
    }

    $('#messagebox').fadeIn("slow");
    $('#messagecontenttitle').fadeIn("slow");
}


$(document).ready(function () {
    var messagecontentclicked = false;

    var $containerWidth = $(window).width();


    if ($containerWidth > 1000) {

    }

    $('#menubutton').click(function () {
        var currentimg = $("button img").attr("src");

        if (currentimg == "/images/menu.png") {
            $("#menu").slideToggle("fast");
            $("button img").attr("src", "/images/close.png");
            $("#navitem").fadeIn("fast");
        } else {
            $("#menu").slideToggle("fast");
            $("button img").attr("src", "/images/menu.png");
            $("#navitem").fadeOut("fast");
        }
    });

    $('a').mouseover(function () {
        var $containerWidth = $(window).width();
        var $linkbackground = $(this).css("background-color");
        hexc($linkbackground)
        var $activelink = color;

        var $menubackground = $('#defaultheader').css("background-color");
        hexc($menubackground);
        var $activecheck = color;

        if ($containerWidth > 1000) {

            if ($activelink === $activecheck) {
                $(this).css({
                    "backgroundColor": "rgb(50, 52, 55)",
                    "transition": "background 200ms",
                });
            } else {
                $(this).css({
                    "color": "rgb(255, 255, 255)",
                    "transition": "background 200ms",
                });
            }
        }
    });

    $('a').mouseout(function () {
        var $containerWidth = $(window).width();
        var $menubackground = $('#defaultheader').css("background-color");


        var $linkcolor = $(this).css("color");
        hexc($linkcolor)
        var $linkcolorcompare = color;

        var $bodycolor = $('body').css("color");
        hexc($bodycolor);
        var $bodycolorcompare = color;

        if ($containerWidth > 1000) {

            if ($linkcolorcompare === $bodycolorcompare) {
                $(this).css({
                    "backgroundColor": $menubackground,
                    "transition": "background 200ms",
                });
            } else {
                $(this).css({
                    "color": "rgb(95,155,234)",
                    "transition": "background 200ms",
                });
            }
        }
    });

    $('#close').click(function () {
        $('#messagebox').fadeOut("slow");
    });

    $('#navitem').click(function () {
        if ($containerWidth < 500) {
            $('#navitem').slideToggle("fast");
        }
    });

    $(window).resize(function () {
        var currentimg = $("button img").attr("src");
        var $containerWidth = $(window).width();
        var MenuisHidden = $("#menu").is(":hidden");

        waitForFinalEvent(function () {

            if ($containerWidth <= 1000) {
                $("#menu").css({ "display": "block" });
                $("button img").attr("src", "/images/menu.png");
                $("#menu").hide();
                $("#navitem").hide();

            } else {
                $("#menu").show();
                $("#menu").css({ "display": "flex" });
                $("#navitem").show();


                if ($containerWidth > 1000) {
                    if (currentimg == "/images/close.png") {
                        //$("button img").attr("src", "/images/menu.png");
                    }
                }
                if (MenuisHidden == true) {

                }
            }

        }, 500, Math.random());
    });

    var textarea = document.querySelector('#messagearea');
    textarea.addEventListener('keydown', autosize);
});


var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = Math.random();
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete (parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
}