var queryURL = "http://www.zillow.com/webservice/GetSearchResults.htm";
var apiKey = "X1-ZWz1782iasn097_at3ig";
var location = "";

$.ajax({
    url: queryURL+apiKey,
    method: "GET"
  }).then(function(response) {
    console.log(response)
  });