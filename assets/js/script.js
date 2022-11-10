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




$("#searchbtn").on("click", function () {

  var searchTitle = document.getElementById("movietitle");
  var searchGenre = document.getElementById("moviegenre");
  var searchYear = document.getElementById("year");

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
});

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

