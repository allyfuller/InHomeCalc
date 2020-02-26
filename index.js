let dp;
const addDays = days => date => {
  const result = new Date(date);
  
  result.setDate(result.getDate() + days);
  
  return result;
};

function calc() {
  var currentDate = $("#mailingDate").datepicker("getDate");
  console.log()
  const range = $("#postage").val()==='Standard' ? {from: 7,to:12} : {from:3,to:5}
  
  $('.results').text(addDays(range.from)(currentDate).toLocaleDateString()+' - '+addDays(range.to)(currentDate).toLocaleDateString())
}

$(function() {
  dp = $("#mailingDate").datepicker().on('change', calc);
});