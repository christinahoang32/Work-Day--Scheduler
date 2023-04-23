var eventsData;

// function to set colors for past/preset/future hours
function setHourColors() {
    var now =dayjs();
    for (var i = 9; i <18; i++) {
        if (i < now.hour()) {
            $("#hour-" + i + " textarea").addClass("past");
        } else if (i == now.hour()) {
            $("#hour-" + i + " textarea").addClass("present");
        } else if (i > now.hour()) {
            $("#hour-" + i + " textarea").addClass("future");

        }       
    }
}



function loadStoredData () {
    eventsData = JSON.parse(localStorage.getItem("calendarEvents"));
    if (!eventsData) {
        eventsData = {
            hour9: "",
            hour10: "",
            hour11: "",
            hour12: "",
            hour13: "",
            hour14: "",
            hour15: "",
            hour16: "",
            hour17: "",
        };
    }
        for (var i = 9; i < 18; i++) {
            $("#hour-" + i + " textarea").val(eventsData["hour" + i]);
        }
    }


function handleSaveClick(event){
    // grab data from HTML
 var hourBlock = $(event.target).parent();
 var value = hourBlock.children("textarea").val();
 var hour = hourBlock.attr('id').split("-")[1];
 
//  modify our data object
eventsData["hour" + hour] = value; 
//  store in local storage
 localStorage.setItem("calendarEvents", JSON.stringify(eventsData));



}


$('.savBtn').on('click', handleSaveClick);

// load current date on page
var date = dayjs();
$('#currentDay').text(date.format('dddd, MMMM D'));


$(function() {
    loadStoredData();
    setHourColors();
});