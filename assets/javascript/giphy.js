function giphy() {
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=tEEFTUSNf170mNTLFD9OkvQMltuPs8gS";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {


        var imageUrl = response.data.image_original_url;


        var randomGiphy = $("<img>");


        randomGiphy.attr("src", imageUrl);
        randomGiphy.attr("alt", "random giphy");


        $("#images").prepend(randomGiphy);
    });

};