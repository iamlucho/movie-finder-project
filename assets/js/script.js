var randomURL = "https://k2maan-moviehut.herokuapp.com/api/movies?limit=100";
var randomNumber = Math.floor(Math.random() * 100);


fetch(randomURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data[randomNumber]);
    localStorage.setItem("randomMovie", JSON.stringify(data.data[randomNumber].name));
    $( "#randomMovie" ).append("<p id='randomName' class='is-flex is-justify-content-center'>Why not watch: </p>");
    $( "#randomMovie" ).append("<p id='randomName' class='title is-flex is-justify-content-center'>"+ data.data[randomNumber].name  + "</p>");
    $( "#randomMovie" ).append("<p class='subtitle is-flex is-justify-content-center'>"+ data.data[randomNumber].overview + "</p>");
  });

//Random Movie Take Me There Button
$("#takemebtn").on("click", function () {
  var randomTitle = localStorage.getItem("randomMovie");
  const APIkey = "0bd962e73cf85056fcdda0597b83fb2b"
  console.log(randomTitle);
  var randomSearchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + APIkey + "&language=en-US&query=" + randomTitle + "&page=1&include_adult=false"

//Added local storage for storing data from the API after user searches title
  fetch(randomSearchURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results[0])
      localStorage.setItem("movie", JSON.stringify(data.results[0]))      
      var url = "search-results.html?name=" + encodeURIComponent(randomTitle);
      window.location.href = url;
  })
})

//Add to Watchlist Button on Results Page
$("#WLbtn").on("click", function() {
  var watchTitle = document.querySelector("#movie-title").textContent;
  popWatchList(watchTitle);
  $("#WLbtn").addClass("is-hidden");
  $("#removelistbtn").removeClass("is-hidden");

  function popWatchList(data) {
  var a = [];
    // Parse the serialized data back into an array of objects
    a = JSON.parse(localStorage.getItem('watchlist')) || [];
    if(a.indexOf(data) == -1){
    // Pushes the new data onto the first position in array
      a.unshift(data);
      //Limits list length to 9
      if(a.length>8) {
        a.pop();
      }
    // Alert the array value
      console.log(a);
    // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem('watchlist', JSON.stringify(a));
    } 
  }
});

$("#removelistbtn").on("click", function (){
  $('#wl-content li:first-child').remove();
  $('#removelistbtn').addClass("is-hidden");
  $('#WLbtn').removeClass("is-hidden");
})

//Show Watchlist Button on Home Page 
$("#watchlistbtn").one("click", function () {
  var WLmovies = JSON.parse(localStorage.getItem("watchlist"));
  for (let i = 0; i < WLmovies.length; i++) {
    var watchList = document.createElement('li');
    watchList.innerHTML = WLmovies[i];
    $('#wl-content').append(watchList);
}
});

//Search History Button on Home Page
$("#priorbtn").one("click", function () {
  var searchedMovies = JSON.parse(localStorage.getItem("movies"));
  for (let i = 0; i < searchedMovies.length; i++) {
    var searchHist = document.createElement('li');
    searchHist.innerHTML = searchedMovies[i];
    $('#hist-content').append(searchHist);
  }
});

//Search Button on Home Page
$("#searchbtn").on("click", function () {

  var searchTitle = document.getElementById("movietitle");
  var searchGenre = document.getElementById("moviegenre");
  var searchYear = document.getElementById("year");

  var titleInput = $("#movietitle").val();
  var titleCaps = titleInput.charAt(0).toUpperCase() + titleInput.slice(1).toLowerCase();
  saveSearch(titleCaps);


//Key & url for database API
  const APIkey = "0bd962e73cf85056fcdda0597b83fb2b"
  var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + APIkey + "&language=en-US&query=" + titleInput + "&page=1&include_adult=false"

//Added local storage for storing data from the API after user searches title
  fetch(searchURL)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("movie", JSON.stringify(data.results[0]))
      console.log(data); 


  if (searchTitle && searchTitle.value) {
    alert("Title");
    var url = "search-results.html?name=" + encodeURIComponent($("#movietitle").val());
    window.location.href = url;
  }
  else if(searchGenre && searchGenre.value){
    alert("Genre");
    var url = "search-results.html?genre=" + encodeURIComponent($("#moviegenre").val());
    window.location.href = url;
  }
  else if(searchYear && searchYear.value){
    alert("Year!");
    var url = "search-results.html?year=" + encodeURIComponent($("#year").val());
    window.location.href = url;
  }
  else{
    alert("Please enter a search parameter!");
  }
    })
  });

//localStorage function
  function saveSearch(data) {
    var a = [];
    // Parse the serialized data back into an array of objects
    a = JSON.parse(localStorage.getItem('movies')) || [];
    if(a.indexOf(data) == -1){
    // Pushes the new data onto the first position in array
      a.unshift(data);
      //Limits list length to 9
      if(a.length>8) {
        a.pop();
      }
    // Alert the array value
      console.log(a);
    // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem('movies', JSON.stringify(a));
  } 
}

$('#movietitle').on('change', function() {
  if(this.value.length > 0){
    $('#moviegenre').prop( "disabled", true );
    $('#year').prop( "disabled", true );
  }
  else{
    $('#moviegenre').prop('disabled', false);
    $('#year').prop('disabled', false);
}
});

$('#moviegenre').on('change', function(){
  var selectedgenre = $('#moviegenre').find(":selected").text();
  if(selectedgenre == "--Select--"){
    $('#movietitle').prop('disabled', false);
    $('#year').prop('disabled', false);
  }
  else{
    $('#movietitle').prop( "disabled", true );
    $('#year').prop( "disabled", true );
  }
});

$('#year').on('change', function(){
  var selectedyear = $('#year').find(":selected").text();
  if(selectedyear == "--Select--"){
    $('#movietitle').prop('disabled', false);
    $('#moviegenre').prop('disabled', false);
  }
  else{
    $('#movietitle').prop( "disabled", true );
    $('#moviegenre').prop( "disabled", true );
  }
});