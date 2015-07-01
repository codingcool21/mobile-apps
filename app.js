window.$app = {};

function centerTag() {
    if ($("[data-role=page]:visible").attr("data-dialog") == "true") {

    } else {
        location.hash = "";
        $("#mainPage .ui-content").css({
                'padding': 0
            })
            //alert($("#tagDiv").height());
        $("#mainPage .ui-content-full").height($(window).height() - $("#mainPage .ui-header").height() - $("#mainPage .ui-footer").height());
        var tagDiv = ($("#tagDiv").height()) / 2
            //alert(tagDiv);
        var div = ($("#tag").height()) / 2
        $("#tag").css("top", tagDiv - div + "px");
        // Get height of the document
        var screenD = $(window).height();
        //alert(screen);
        // Get height of the header
        var header = $('#mainPage .ui-header').height();

        // Get height of the footer
        var footer = $('#mainPage .ui-footer').height();
        //alert(footer);
        // Simple calculation to get the remaining available height
        var deviceAgent = navigator.userAgent.toLowerCase();
        var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
        if (agentID) {
            var content = screenD - header - footer - 5;
            $("#mainPage .ui-header").addClass("ui-header-ipod")
            $("#mainPage .ui-header-top").show();
        } else {
            var content = screenD - header - footer - 5;
            $(".ui-header-top").hide();
        }
        // Change the height of the `content` div
        $('#mainPage .ui-content').css({
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
        $app.changeValue();
    }
});
$(window).on("pagecontainerchange", function(k, a) {
    switch ($(a.toPage[0]).attr("id")) {
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
    //$("#loading").show();
    if ($("#changeMessage").val() !== "") {
        $app.fRef.child("clientdata/mobapp/value").set($("#changeMessage").val());
        $("#changeMessage").val("");
        centerTag();
        $("#loading").hide();
    } else {
        $("#loading").hide();
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
