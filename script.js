var queryURL = "https://valleyforce.secure.force.com/services/apexrest/orderrecords?token=$P$BAkTBLgqfEdYaMUpVpZ0AJYLFg2PPS&limit=500&offset=0"

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  
  response.job.sort(function (a, b) {
    if (a.state.toLowerCase() < b.state.toLowerCase()) {
      return -1;
    }
    if (a.state.toLowerCase() > b.state.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  })
  
  for (let i = 0; i < response.job.length; i++) {

    var options = $("<option>");
    options.text(response.job[i].city + ", " + response.job[i].state)
    options.attr("class", "options1")
    var select1 = $("#select1")
    select1.append(options)
  }

  for (let i = 0; i < response.job.length; i++) {

    var options = $("<option>");
    options.text(response.job[i].city + ", " + response.job[i].state)
    options.attr("class", "options2")
    var select2 = $("#select2")
    select2.append(options)

  }

  $("button").on("click", function () {
    var firstObject = document.getElementById("select1")
    var secondObject = document.getElementById("select2")

    var opt1 = firstObject.options[firstObject.selectedIndex];
    var opt2 = secondObject.options[secondObject.selectedIndex];

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
    let selectionIndex2 = options2NewArray.findIndex(option2 => option2 === opt2.text)
   
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
   
    costOfLiving1 = (mie1 * 365) + (lodging1 * 365)
    displayCost1 = formatter.format(costOfLiving1);


    $("#costofliving1").html("Yearly Cost of Living: " + displayCost1)
    var salary1Int = $("#salary1").attr("data-salary")

    var disposableIncome1 = salary1Int - costOfLiving1;

    console.log("dispoableIncome1: ", disposableIncome1)

    $("#disposableincome1").html("Disposable Income: " + formatter.format(disposableIncome1))

    if (disposableIncome1 <= 0) {
      $("#job-background1").addClass("red")
      $("#job-background1").removeClass("yellow")
      $("#job-background1").removeClass("green")
    } else if (disposableIncome1 < 10000 && disposableIncome1 > 0) {
      $("#job-background1").addClass("yellow")
      $("#job-background1").removeClass("red")
      $("#job-background1").removeClass("green")
    } else if (disposableIncome1 > 10000) {
      $("#job-background1").addClass("green")
      $("#job-background1").removeClass("yellow")
      $("#job-background1").removeClass("red")
    }
      
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
  
    costOfLiving2 = (mie2 * 365) + (lodging2 * 365)
    displayCost2 = formatter.format(costOfLiving2);

    $("#costofliving2").html("Yearly Cost of Living: " + displayCost2)
    var salary2Int = $("#salary2").attr("data-salary")

    var disposableIncome2 = salary2Int - costOfLiving2;

     console.log("disposableIncome2: ", disposableIncome2)

    $("#disposableincome2").html("Disposable Income: " + (formatter.format(disposableIncome2)))

    if (disposableIncome2 <= 0) {
      $("#job-background2").addClass("red")
      $("#job-background2").removeClass("yellow")
      $("#job-background2").removeClass("green")
    } else if (disposableIncome2 < 10000 && disposableIncome2 > 0) {
      $("#job-background2").addClass("yellow")
      $("#job-background2").removeClass("red")
      $("#job-background2").removeClass("green")
    } else if (disposableIncome2 > 10000) {
      $("#job-background2").addClass("green")
      $("#job-background2").removeClass("yellow")
      $("#job-background2").removeClass("red")
    }
  });
}