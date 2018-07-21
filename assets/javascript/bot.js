var bot = {
    username: "",
    checkMsg: function(msg) {
        if(msg.charAt(0) === "!") {
            this.botAction(msg);
        }
    },

    botAction: function (msg) {
        var action = msg.substring(1);
        switch (action) {
            case "giphy":
                //giphy()
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

function giphy(q, n) {
    var APIKEY = ""
    var url = "http://api.giphy.com/v1/gifs/search?q="+q+"&api_key="+APIKEY;

}