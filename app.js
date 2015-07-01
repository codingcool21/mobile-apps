window.$app = {};

function centerTag() {
    if ($("[data-role=page]:visible").attr("data-dialog") == "true") {

    } else {
        $(".ui-content:visible").css({
                'padding': 0
            })
            //alert($("#tagDiv").height());
        $(".ui-content-full").height($(window).height() - $(".ui-header:visible").height() - $(".ui-footer:visible").height());
        var tagDiv = ($("#tagDiv").height()) / 2
            //alert(tagDiv);
        var div = ($("#tag").height()) / 2
        $("#tag").css("top", tagDiv - div + "px");
        // Get height of the document
        var screenD = $(window).height();
        //alert(screen);
        // Get height of the header
        var header = $('.ui-header:visible').height();

        // Get height of the footer
        var footer = $('.ui-footer:visible').height();
        //alert(footer);
        // Simple calculation to get the remaining available height
        var deviceAgent = navigator.userAgent.toLowerCase();
        var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
        if (agentID) {
            var content = screenD - header - footer - 5;
            $(".ui-header:visible").addClass("ui-header-ipod")
        } else {
            var content = screenD - header - footer - 5;
            $(".ui-header-top").hide();
        }
        // Change the height of the `content` div
        $('.ui-content:visible').css({
            'height': content
        });
    }
}
$app.fRef = new Firebase("https://updatemessage.firebaseio.com/");
$(window).hashchange(function(ag) {
    if (location.hash == "" || location.hash == "#mainPage") {
        //centerTag();
    }
    if (location.hash == "#change") {
        //$app.changeValue();
    }
});
$(window).on("pagecontainerchange", function(k, a) {
    switch($(a.toPage[0]).attr("id")) {
        case "mainPage":
            centerTag();
            break;
        case "editPage":
            break;
    }
});
$app.currentValue = "";
$app.fRef.child("clientdata/mobapp/value").on("value", function(a) {
    $("#loading").hide();
    $("#tag").text(a.val());
    $app.currentValue = a.val();
    $("#changeMessage").attr("placeholder", a.val());
    centerTag();
    //centerTag();
});
$app.changeValue = function() {
    $("#loading").show();
    if ($("#changeMessage").val() !== "") {
        $app.fRef.child("clientdata/mobapp/value").set($("#changeMessage").val());
        $("#changeMessage").val("");
        centerTag();
    } else {
        return false;
    }
}
$(centerTag);
$(window).resize(centerTag);
/*$(function () {
    $("<div class='ui-header-top'>").prependTo("[data-role='page']");
})*/
/*$(window).on("touchmove", function(e) {
    e.preventDefault();
})*/
