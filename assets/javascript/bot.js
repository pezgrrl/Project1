function giphySearch(query) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=tEEFTUSNf170mNTLFD9OkvQMltuPs8gS";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var imageUrl = response.data[4].images.fixed_width.url;
        var randomDiv = $("<div>");
        var randomGiphy = $("<img>");

        randomGiphy.attr("src", imageUrl);

        randomGiphy.attr("alt", "random giphy");

        randomDiv.append(randomGiphy)
        console.log(randomDiv)

        $("#msg-box").append(randomDiv)
        console.log(randomGiphy);
    });

};


window.bot = {
    username: "",
    checkMsg: function(msg) {
        if (msg.charAt(0) === "!") {
            this.botAction(msg);
        }
    },

    botAction: function(msg) {
        var action = msg.substring(1);
        switch (action.split(" ")[0]) {
            case "giphy":
                giphySearch(action.split(" ")[1]);
                break;
            case "trivia":
                //trivia()
                break;
            case "help":
                //help()
                break;
            default:
                //help()
                break;
        }
    },
    help: function() {
        //tell what bot can do
    }
}
