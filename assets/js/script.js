var searchButton = document.getElementById('');
var APIKey = "";

//Fetch Method
fetch(requestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  // Use the console to examine the response
  console.log(data);
});
