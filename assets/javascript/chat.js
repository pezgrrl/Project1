
$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCc2VPnhKLPvdEc_h6txQyIIcxrm2Ll_3s",
    authDomain: "project1-chat.firebaseapp.com",
    databaseURL: "https://project1-chat.firebaseio.com",
    projectId: "project1-chat",
    storageBucket: "project1-chat.appspot.com",
    messagingSenderId: "357337575812"
  };
  firebase.initializeApp(config);
    var database = firebase.database();
    var sn = "anon";
    $("#pick").on("click", function (event) {
        event.preventDefault();
        if ($("#user").val()) {
            sn = $("#user").val();
        }
        $("#overlay").css("display", "none");
        $("#msg").focus();
    });
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
            database.ref("users/"+sn).push({
                name: sn,
                message: msg,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            });
            database.ref("date/"+moment().format("YYYY MMMM DD")).push({
                name: sn,
                message: msg,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
            });
        }
    });

    database.ref("recent-history").orderByChild("timestamp").limitToLast(50).on("child_added", function (snapshot) {
        var historySV = snapshot.val();
        var newMsg = $("<p>");
        console.log(historySV);
        newMsg.text(historySV.name + ": " + historySV.message);
        $("#msg-box").append(newMsg);
        $("p")[$("p").length-1].scrollIntoView();
    });

    /*
  
    $("#add-user").on("click", function(event) {
        event.preventDefault();
  
        // Grabbed values from text boxes
        name = $("#name-input").val().trim();
        email = $("#email-input").val().trim();
        age = $("#age-input").val().trim();
        comment = $("#comment-input").val().trim();
  
        // Code for handling the push
        database.ref().push({
          name: name,
          email: email,
          age: age,
          comment: comment,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
  
      });
      database.ref().on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
  
        // Console.loging the last user's data
        console.log(sv.name);
        console.log(sv.email);
        console.log(sv.age);
        console.log(sv.comment);
  
        // Change the HTML to reflect
        $("#name-display").text(sv.name);
        $("#email-display").text(sv.email);
        $("#age-display").text(sv.age);
        $("#comment-display").text(sv.comment);
  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  
      */











});