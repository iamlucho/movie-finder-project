var movietitle = document.getElementById('movietitle').value;
var APIKey = "k_xv4tojov";
var requestUrl = "https://imdb-api.com/en/API/SearchMovie/" + APIKey + "/" + movietitle;

var TMBDAPIKey = "efe8b15b69949a5c3ee112a5db229155";

var returntitle = "";
var returnid = "";
var returnphoto = "";
var returndescription = "";

// Add click event to search button element to request data from IMDB API using provided key.
$( "#searchbtn" ).click(function() {
    //Fetch Method
fetch(requestUrl)
// Save IMBD response to JSON file. 
.then(function (response) {
  return response.json();
})
.then(function (data) {
  // Use the console to examine the response
  console.log(data);
  for (i in data.results) 
  {
    // Retrieved IMBD movie ID.
      x = data.results[i].id;
      //console.log(x)
      //var ratingsURL = "https://imdb-api.com/en/API/Ratings/" + APIKey + "/" + x;
      //Used IMBD movie ID to retrieve additional data.
      var ratingsURL = "https://imdb-api.com/en/API/Title/" + APIKey + "/" + x + "/Trailer,Ratings,Poster";

      fetch(ratingsURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data2) { 
          // Extract movie information from API dataset, as follows.
            console.log("Title:" + data2.fullTitle);
            console.log("Poster:" + data2.poster);
            console.log("Description:" + data2.plot);
            console.log("Year:" + data2.year);
            console.log("Genre:" + data2.genres);         
            //https://www.omdbapi.com/?apikey=93656b&s=batman&type=movie&r=json&&page=1   
        })
  }
});
  });