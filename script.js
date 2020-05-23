var queryURL = "https://valleyforce.secure.force.com/services/apexrest/orderrecords?token=$P$BAkTBLgqfEdYaMUpVpZ0AJYLFg2PPS&limit=500&offset=0"
var selectionIndex1 = "";
var selectionIndex2 = "";
var weeklyNonTax1 = "";
var weeklyGross1 = "";
var annualSalary1;
var zipCode1 = "";
var state1 = "";
var city1 = "";
var weeklyNonTax2 = "";
var weeklyGross2 = "";
var annualSalary2;
var zipCode2 = "";
var state2 = "";
var city2 = "";
var lodging1 = "";
var mie1 = "";
var lodging2 = "";
var mie2 = "";
var costOfLiving1;
var costOfLiving2;
var jobTitle1 = "";
var jobTitle2 = "";

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {

  for (let i = 0; i < response.job.length; i++) {
    var options = $("<option>");
    options.text(response.job[i].city + ", " + response.job[i].state)
    // options.attr("data-index", i);
    options.attr("class", "options1")
    var select1 = $("#select1")
    select1.append(options)
  }
  for (let i = 0; i < response.job.length; i++) {
    var options = $("<option>");
    options.text(response.job[i].city + ", " + response.job[i].state)
    //options.attr("data-index", i);
    options.attr("class", "options2")
    var select2 = $("#select2")
    select2.append(options)
  }
  $("button").on("click", function () {
    var firstObject = document.getElementById("select1")
    var secondObject = document.getElementById("select2")
    var opt1 = firstObject.options[firstObject.selectedIndex];
    //console.log(opt1)
    var opt2 = secondObject.options[secondObject.selectedIndex];
    //console.log(opt2)
    var options1Array = $(".options1");
    var options1NewArray = [];
    var options2Array = $(".options2");
    var options2NewArray = [];

    for (var i = 0; i < options1Array.length; i++) {
      options1NewArray[i] = options1Array[i].innerText; //steve changes to innertext

    }
    for (var i = 0; i < options2Array.length; i++) {
      options2NewArray[i] = options2Array[i].innerText; //steve changes to innertext
    }

    let selectionIndex1 = options1NewArray.findIndex(option1 => option1 === opt1.text)
    //console.log(selectionIndex1)
    let selectionIndex2 = options2NewArray.findIndex(option2 => option2 === opt2.text)
    //console.log(selectionIndex2)

    var weeklyNonTax1 = parseFloat(response.job[selectionIndex1].weeklyNonTaxablePay);
    var weeklyGross1 = parseFloat(response.job[selectionIndex1].weeklyGrossPay);

    var annualSalary1 = ((weeklyNonTax1 + weeklyGross1) * 52)
    var displaySal1 = formatter.format(annualSalary1);
    var zipCode1 = response.job[selectionIndex1].zipcode
    var state1 = response.job[selectionIndex1].state
    var city1 = response.job[selectionIndex1].city
    var jobTitle1 = response.job[selectionIndex1].profession

    var weeklyNonTax2 = parseFloat(response.job[selectionIndex2].weeklyNonTaxablePay);
    var weeklyGross2 = parseFloat(response.job[selectionIndex2].weeklyGrossPay);
    var annualSalary2 = ((weeklyNonTax2 + weeklyGross2) * 52)
    var displaySal2 = formatter.format(annualSalary2);

    var zipCode2 = response.job[selectionIndex2].zipcode
    var state2 = response.job[selectionIndex2].state
    var city2 = response.job[selectionIndex2].city
    var jobTitle2 = response.job[selectionIndex1].profession

    console.log('annualSalary1', annualSalary1)
    console.log('zipCode1', zipCode1)
    console.log('state1', state1)
    console.log('city1', city1)
    console.log('annualSalary2', annualSalary2)
    console.log('zipCode2', zipCode2)
    console.log('state2', state2)
    console.log('city2', city2)
    console.log('jobtitle1', jobTitle1)
    console.log('jobtitle2', jobTitle2)

    $("#jobtitle1").html(jobTitle1)
    $("#jobtitle2").html(jobTitle2)

    var cityStateZip1 = city1 + ", " + state1 + " " + zipCode1
    var cityStateZip2 = city2 + ", " + state2 + " " + zipCode2
    $("#location1").html(cityStateZip1)
    $("#location2").html(cityStateZip2)

    $("#salary1").html("Annual Salary: " + displaySal1)
    $("#salary1").attr("data-salary", annualSalary1)
    $("#salary2").html("Annual Salary: " + displaySal2)
    $("#salary2").attr("data-salary", annualSalary2)


    getCostOfLiving1(zipCode1)
    getCostOfLiving2(zipCode2)


  })
})

// *****GSA*****
var apiKey = "X10L1oTu5TMigPHxoePl1yaCQzhqsqDpHh5WHIc7";
var queryBase = "https://api.gsa.gov/travel/perdiem/v2/rates/zip/"

function getCostOfLiving1(zipCode1) {
  var queryURL =
    queryBase +
    zipCode1 +
    "/year/2020?api_key=" +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lodging1 = response.rates[0].rate[0].months.month[0].value;
    var mie1 = response.rates[0].rate[0].meals;
    console.log('lodging1', lodging1)
    console.log('mie1', mie1)
    costOfLiving1 = (mie1 * 365) + (lodging1 * 365)
    displayCost1 = formatter.format(costOfLiving1);

    console.log('costOfLiving1', costOfLiving1)

    $("#costofliving1").html("Yearly Cost of Living: " + displayCost1)
    var salary1Int = $("#salary1").data("salary")

    var disposableIncome1 = salary1Int - costOfLiving1;
    $("#disposableincome1").html(formatter.format(disposableIncome1))

  });
}

function getCostOfLiving2(zipCode2) {
  var queryURL =
    queryBase +
    zipCode2 +
    "/year/2020?api_key=" +
    apiKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lodging2 = response.rates[0].rate[0].months.month[0].value;
    var mie2 = response.rates[0].rate[0].meals;
    console.log('lodging2', lodging2)
    console.log('mie2', mie2)
    costOfLiving2 = (mie2 * 365) + (lodging2 * 365)
    displayCost2 = formatter.format(costOfLiving2);

    console.log('costOfLiving2', costOfLiving2)

    $("#costofliving2").html("Yearly Cost of Living: " + displayCost2)
    var salary2Int = $("#salary2").data("salary")

    var disposableIncome2 = salary2Int - costOfLiving2;
    $("#disposableincome2").html(formatter.format(disposableIncome2))
  });
}