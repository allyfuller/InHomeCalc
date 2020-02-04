/*///////////////////////////////////////////////
    // State Ship Time Estimates \\
/*///////////////////////////////////////////////
//Data for the estimated time it takes to ship to each state.
var data=
{"shipTimes": {
	"Standard" : "5",
	"FirstClass" : "2"
}};
//console.log(data.shipTimes.AL);

//Data for the number of days in each month
var daysInAMonth=
{"daysThisMonth": {
	"January" : "31",
	"February" : "28",
	"March" : "31",
	"April" : "30",
	"May" : "31",
	"June" : "30",
	"July" : "31",
	"August" : "31",
	"Septemeber" : "30",
	"October" : "31",
	"November" : "30",
	"December" : "31",
}};


/*///////////////////////////////////////////////
    // Find and label the Weekends\\
/*///////////////////////////////////////////////
//Add the day of the month as a data attribute
$counter = 1;
$('li').each(function() {
  $( this ).attr( "day-of-the-month", $counter );
  $counter++;
});

//Loop through each each of the products, log every 6 & 7th day then reset the counter and continue looping
$counter = 1;
$('li').each(function() {
  if( $(this).attr("day-of-the-month") < 6 ) {
    $date = $(this).html();
    $(this).html($date + " is too soon bro!");
  } else if($counter == 6) {
    $(this).attr('isWeekend','yes');
    $counter++;
  } else if($counter == 7) {
    $(this).attr('isWeekend','yes');
    $counter = 1;
  } else {
    $(this).attr('isWeekend','no');
    $counter++;
  }
});


/*///////////////////////////////////////////////
    // Todays Date \\
/*///////////////////////////////////////////////
var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var todaysDate = ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '') + day + '/' + d.getFullYear() ;
$('#todaysDate').append(" " + todaysDate);


/*///////////////////////////////////////////////
    // Basic Shipping Estimate \\
/*///////////////////////////////////////////////
/*
$('#calculateShippingEstimate').click(function( event ) {
  
  //Prevent button from 'submitting' and reloading the page
  event.preventDefault();
  
  //Capture the lead time
  leadTime = $("#leadTime").val();
  
  //Create the date
  var date = new Date();
  var month = date.getMonth()+1;
  var day = date.getDate() + parseInt(leadTime);
  var basicShippingEstimateDate = ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '') + day + '/' + date.getFullYear();
  $('form').after("Your estimated delivery date is " + basicShippingEstimateDate);
  
  
  
  //
  //console.log( $("#leadTimeType").val() );
  
});*/



/*///////////////////////////////////////////////
    // Final Shipping Estimate \\
/*///////////////////////////////////////////////

$('#calculateShippingEstimate').click(function( event ) {
  
  //Prevent button from 'submitting' and reloading the page
  event.preventDefault();
  
  //Capture the lead time
  var $leadTime = $("#leadTime").val();
  var $leadTimeType = $("#leadTimeType").val();
  if( $leadTimeType == 'weeks' ) {
    $leadTime = parseInt($leadTime)*7;
    console.log($leadTime);
  } else {
    console.log( parseInt($leadTime) );
  }
  
  var $postageType = $("#postageType").val();
  var $shipStateShippingDuration = eval('data.shipTimes.' + $postageType);  
  var $totalShippingTime = parseInt($leadTime) + parseInt($shipStateShippingDuration);
  
  //Create the date
  var date = new Date();
  var month = date.getMonth()+1;
  var day = date.getDate() + parseInt($totalShippingTime);
  var year = date.getFullYear();
  
  //Convert the month number to month name in order to access the number of days data stored in the JSON data
  var monthName = "";
  if( month === 01 ) {
    monthName = "January";
  } else if(month === 02) {
    monthName = "February";
  } else if(month === 03) {
    monthName = "March";
  } else if(month === 04) {
    monthName = "April";
  } else if(month === 05) {
    monthName = "May";
  } else if(month === 06) {
    monthName = "June";
  } else if(month === 07) {
    monthName = "July";
  } else if(month === 08) {
    monthName = "August";
  } else if(month === 09) {
    monthName = "September";
  } else if(month === 10) {
    monthName = "October";
  } else if(month === 11) {
    monthName = "November";
  } else if(month === 12) {
    monthName = "December";
  }  
  
  //console.log("This month is the " + month + "th month of the year.");
  var daysThisMonth = eval('daysInAMonth.daysThisMonth.' + monthName);
  
  //Change all of these if statements into a while statement
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  
  
  
  //Count the number of weekends
  var $weekendCounter = 0;
  var $shipEstimateWithWeekends = ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '') + day + '/' + year;
  
  $('li[isweekend="yes"]').each(function() {
    if( $(this).html() >= todaysDate && $(this).html() <= $shipEstimateWithWeekends ) {
      console.log("Found a weekend day");
      $weekendCounter++;
    }
  });
  console.log("There are " + $weekendCounter + " weekend days during this time period");
  
  day = day + parseInt($weekendCounter);
  
  //Change all of these if statements into a while statement
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  
  //If the month exceeds December, reset back to January
  if( month > 12 ) {
    month = month - 12;
    year = year + 1;
  }
  
  
  //day = day + parseInt($weekendCounter);
  //console.log("There are " + $weekendCounter + " weekend days during this second time period");
  
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  if( day > daysThisMonth ) {
    day = day - daysThisMonth;
    month = month + 1;
  }
  
  //Put together the final estimated ship date
  var basicShippingEstimateDate = ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '') + day + '/' + year;
  $('.results').html("Your estimated delivery date is " + basicShippingEstimateDate);
  
  //Get Todays Date As Var
  //Get Estimated Delivery Date As Var
  //Count the number of days that are weekends between the two dates
  
});