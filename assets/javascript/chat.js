var config = {
    apiKey: "AIzaSyCc2VPnhKLPvdEc_h6txQyIIcxrm2Ll_3s",
    authDomain: "project1-chat.firebaseapp.com",
    databaseURL: "https://project1-chat.firebaseio.com",
    projectId: "project1-chat",
    storageBucket: "project1-chat.appspot.com",
    messagingSenderId: "357337575812"
};
firebase.initializeApp(config);
var userList = [];
var isDuplicate = false;
$(document).ready(function () {



    // Initialize Firebase
    var database = firebase.database();
    // If there is already a screenname in local storage, the browser will choose that one instead of anon -ps
    if (localStorage.getItem("sn")) {
        var sn = localStorage.getItem("sn");
    } else {    //anon is the default for those who do not pick screennames -ps
        var sn = "anon";
    }

    //overlay div for picking username initially -ps
    var overlay = $("<div>").css({
        position: "absolute",
        width: "100%",
        height: "100%",
        "z-index": "999",
        "background-color": "#868e96e3",
        opacity: "0.99",
        display: "block",
    });
    var snForm = $("<form>");
    var snChoice = $("<input type='text' placeholder='Pick a screen name...' id='sn'>");
    snChoice.addClass("my-5 mx-auto d-block");
    var snButton = $("<input type=submit id='snSubmit'>").css("display", "none");
    snForm.append(snChoice, snButton);
    overlay.append(snForm);

    //submit button for screenname, sets screenname in localstorage and pushes to database
    $("body").on("click", "#snSubmit", function (event) {
        event.preventDefault();
        if ($("#sn").val()) {
            sn = $("#sn").val();
            localStorage.setItem("sn", sn);
        }
        for (let i = 0; i < userList.length; i++) {
            isDuplicate = (localStorage.getItem("sn") === userList[i]);
            if(isDuplicate) {
                return;
            }
        }
        console.log(isDuplicate);
        if (isDuplicate) {
            localStorage.setItem("sn", "anon");
        } else {
            if (localStorage.getItem("sn")) {
                database.ref("userlist/" + localStorage.getItem("sn")).push({
                    name: localStorage.getItem("sn"),
                });
            }
            overlay.css("display", "none");
            $("#msg").focus();
        }
        //pushes sn in localstorage to userlist
    });
    $("body").append(overlay);


    //pushes messages to database when send button clicked
    $("#send").on("click", function (event) {
        event.preventDefault();
        if ($("#msg").val()) {
            var msg = $("#msg").val();
            $("#msg").val("");
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


    //updates userList array when new child added to userlist database
    database.ref("userlist").on("child_added", function (snapshot) {
        var newUser = snapshot.key;
        console.log(newUser);
        userList.push(newUser);
        console.log(userList);
        $("#contacts ul").append('\
        <li class="contact active" id='+newUser+'>\
            <div class="wrap">\
                <span class="contact-status online"></span>\
                <img src="assets/images/img.png" alt="" />\
                <div class="meta">\
                    <p class="name">'+newUser+'</p>\
                    <p class="preview"></p>\
                </div>\
            </div>\
        </li>');
    });

    database.ref("userlist").on("child_removed", function (snapshot) {
        var signoffUser = snapshot.key;
        console.log(signoffUser);
        userList.splice(userList.indexOf(signoffUser),1);
        console.log(userList);
        $("#"+signoffUser).remove();
    });

    //code to run when user closes screen (signs off)
    window.onbeforeunload = function () {
        var sn = localStorage.getItem("sn");
        database.ref("userlist/" + sn).remove();
    }


    //updates chat window with most recent 50 messages and scrolls most recent into view
    database.ref("recent-history").orderByChild("timestamp").limitToLast(50).on("child_added", function (snapshot) {
        var historySV = snapshot.val();
        var newMsg = $("<li>");
        var msgTxt = $("<p>");
        newMsg.addClass("sent");
        //console.log(historySV);
        msgTxt.text(historySV.name + ": " + historySV.message);
        newMsg.append(msgTxt);
        $("#msg-box").append(newMsg);
        $("p")[$("p").length - 1].scrollIntoView();
    });


});
