var config = {
    apiKey: "AIzaSyCc2VPnhKLPvdEc_h6txQyIIcxrm2Ll_3s",
    authDomain: "project1-chat.firebaseapp.com",
    databaseURL: "https://project1-chat.firebaseio.com",
    projectId: "project1-chat",
    storageBucket: "project1-chat.appspot.com",
    messagingSenderId: "357337575812"
};
firebase.initializeApp(config);
$(document).ready(function () {
    // Initialize Firebase
    var database = firebase.database();
    if (localStorage.getItem("sn")) {
        var sn = localStorage.getItem("sn");
    } else {
        var sn = "anon";
    }
    var overlay = $("<div>").css({
        position: "absolute",
        width: "100%",
        height: "100%",
        "z-index": "999",
        "background-color": ""#868e96e3"",
        opacity: "0.99",
        display: "block",
    });
    var snForm = $("<form>");
    var snChoice = $("<input type='text' placeholder='Pick a screen name...' id='sn'>");
    snChoice.addClass("my-5 mx-auto d-block");
    var snButton = $("<input type=submit class='sn'>").css("display", "none");
    snForm.append(snChoice, snButton);
    overlay.append(snForm);
    $("body").on("click", ".sn", function (event) {
        event.preventDefault();
        if ($("#sn").val()) {
            sn = $("#sn").val();
            localStorage.setItem("sn", sn);
        }
        overlay.css("display", "none");
        $("#msg").focus();
    });
    $("body").append(overlay);
    $("#send").on("click", function (event) {
        event.preventDefault();
        if ($("#msg").val()) {
            var msg = $("#msg").val();
            $("#msg").val("");
            //TODO: set sn to each username (local storage?)
            database.ref("recent-history").push({
                name: sn,
                message: msg,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            });
            database.ref("users/" + sn).push({
                name: sn,
                message: msg,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            });
            database.ref("date/" + moment().format("YYYY MMMM DD")).push({
                name: sn,
                message: msg,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    });

    database.ref("recent-history").orderByChild("timestamp").limitToLast(50).on("child_added", function (snapshot) {
        var historySV = snapshot.val();
        var newMsg = $("<li>");
        var msgTxt = $("<p>");
        newMsg.addClass("sent");
        console.log(historySV);
        msgTxt.text(historySV.name + ": " + historySV.message);
        newMsg.append(msgTxt);
        $("#msg-box").append(newMsg);
        $("p")[$("p").length - 1].scrollIntoView();
    });


});
