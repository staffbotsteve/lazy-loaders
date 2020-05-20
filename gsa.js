var apiKey = "X10L1oTu5TMigPHxoePl1yaCQzhqsqDpHh5WHIc7";
var yearEl = document.getElementById("year");
var zipEl = document.getElementById("zip");
var cityEl = document.getElementById("city");
var stateEl = document.getElementById("state");
var queryBase = "https://api.gsa.gov/travel/perdiem/v2/rates/zip/"

var cityInput = "";
var zipInput = "";
var stateInput = "";
var yearInput = "";
var lodging = "";
var mie = "";

function getCostOfLiving(zipInput, yearInput){
  
  var queryURL =
  queryBase + 
  zipInput +
  "/year/" +
  yearInput +
  "?api_key=" +
  apiKey;

  console.log('queryURL', queryURL)
  
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lodging = response.rates[0].rate[0].months.month[0].value;
    var mie = response.rates[0].rate[0].meals;
    console.log('response', response)
    // $('#costOfLiving').val((lodging*365)+(mie*365))

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

formatter.format(2500); /* $2,500.00 */
    
    $('#costOfLiving').val(formatter.format((mie*365)+(lodging*365)))

  });
}

$("#dataSubmit").on("click", function (event) {
  zipInput = $("#zip").val();
  yearInput = $("#year").val();
  getCostOfLiving(zipInput, yearInput)
  event.preventDefault();
});
