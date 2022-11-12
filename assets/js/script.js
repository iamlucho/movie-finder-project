var randomURL = "https://k2maan-moviehut.herokuapp.com/api/movies?limit=100";
var randomNumber = Math.floor(Math.random() * 100);

fetch(randomURL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data[randomNumber]);
    $( "#randomMovie" ).append("<p id='randomName' class='is-flex is-justify-content-center'>Why not watch: </p>");
    $( "#randomMovie" ).append("<p id='randomName' class='title is-flex is-justify-content-center'>"+ data.data[randomNumber].name  + "</p>");
    $( "#randomMovie" ).append("<p class='subtitle is-flex is-justify-content-center'>"+ data.data[randomNumber].overview + "</p>");
  });

  
  $("#takemebtn").on("click", function () {

  });

//Back button
$("#priorbtn").on("click", function () {

  var searchedMovies = JSON.parse(localStorage.getItem("movies"));
  for (let i = 0; i < searchedMovies.length; i++) {
    var watchList = document.createElement('li');
    watchList.innerHTML = searchedMovies[i];
    $('#hist-content').append(watchList);
  }
});

$("#searchbtn").on("click", function () {

  var searchTitle = document.getElementById("movietitle");
  var searchGenre = document.getElementById("moviegenre");
  var searchYear = document.getElementById("year");

  var titleInput = $("#movietitle").val();
  saveSearch(titleInput);

//Key & url for database API
  const APIkey = "0bd962e73cf85056fcdda0597b83fb2b"
  var searchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + APIkey + "&language=en-US&query=" + titleInput + "&page=1&include_adult=false"


//Added current date of day
var today = moment();
$("#date").text(today.format("MMM Do, YYYY"));

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
      //Limits list length to 8
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
