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
                //giphySearch(action.)
                break;
            case trivia:
                //trivia()
                break;
            case help:
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