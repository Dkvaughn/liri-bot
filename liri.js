require("dotenv").config();

var request = require("request");
var include = require("include");
var bandsintown = require("bandsintown");
var space = "\n" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
var dataKeys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(
        dataKeys.spotify
    );

var liriArgument = process.argv[2];




console.log(process.argv[2]);




switch (liriArgument) {

    case "spotify-this-song": spotifyThisSong(); break;
    case "movie-this": movieThis(); break;
    case "search-bands" : searchBands(); break;
    // Instructions displayed in terminal to the user
    default: console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +

        "1. spotify-this-song 'any song name' " + "\r\n" +
        "2. movie-this 'any movie name' " + "\r\n" +
        "3. search-bands 'any band name'" + "\r\n" +
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};






//functiong for calling a spotify search
//grabs arg and replaces 
function spotifyThisSong() {

    

    var songName = process.argv[3];

 
    //turns search into songname
    //params = songName;
    // songName = "toxic";
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {


            return console.log('Error occurred: ' + err);

        } else {
            output = space + "===================================" +
                space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
                space + "Album Name: " + data.tracks.items[0].album.name +
                space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +

                space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
            console.log(output);
        }

    });
};





//function to call a movie search
function movieThis() {
    //grabs arg and substitues for search
    var movie = process.argv[3];
    //movie requeset
    params = movie
    request("http://www.omdbapi.com/?i=tt3896198&apikey=407fd975&" + params /*+ "&y=&plot=short&r=json&tomatoes=true"*/, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var movieObject = JSON.parse(body);
            console.log(movieObject); // Show the text


            //types it out to command if valid search if not err

            var movieResults =
                "------------------------------------------------------------" + "\r\n"
            "Title: " + movieObject.Title + "\r\n" +
                "Year: " + movieObject.Year + "\r\n" +
                "Imdb Rating: " + movieObject.imdbRating + "\r\n" +
                "Country: " + movieObject.Country + "\r\n" +
                "Language: " + movieObject.Language + "\r\n" +
                "Plot: " + movieObject.Plot + "\r\n" +
                "Actors: " + movieObject.Actors + "\r\n" +
                // "Rotten Tomatoes Rating: " + movieObject.tomatoRating + "\r\n" +
                // "Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" +
                "--------------------------------------------------------------" + "\r\n";


            //console.log(movieResults);
            // calling log function
        } else {
            console.log("Error :" + error);
            return;
        }
    });
};




function searchBands(){
    var band = process.argv[3];
    console.log(band);
    request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function (error, response, body){

    if(!error && response.statusCode === 200){
        var object = JSON.parse(body);
        object.forEach(element => {
        console.log(`
        Venue: ${element.venue.name}
        Venue Location: ${element.venue.city}, ${element.venue.country}
        Date of Event: ${element.datetime}
        `);
    
//  console.log(body);
    });
};
    });



};