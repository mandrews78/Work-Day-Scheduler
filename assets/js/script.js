//var calendarTitle = document.getElementById("display-3")

var currentDayEl = document.querySelector("#currentDay");
var todayDate = moment().format("dddd, MMMM Do, YYYY");
currentDayEl.textContent = todayDate;

var items = []; 
var appointmentHourIndex = 9;

var checkTime = function() {
    $(".hour").each(function(){
        var currentTime = (moment().format("H").toString());
        var appointment = $(this).text();
        if (appointmentHourIndex > 12) {
            appointmentHourIndex = 1;
        }
        if (appointment.includes(appointmentHourIndex)) {
            var check = $(this).parent().children()[1]
            check.id = ("id", appointment);
            appointmentHourIndex++;
        }
        var appointmentHour = parseInt ($(this).find("span").text());
        if (appointmentHour < 9) {
            appointmentHour = appointmentHour + 12;
        }
        if (currentTime - appointmentHour === 0) {
            check.classList.add("present");
        }
        if (currentTime - appointmentHour > 0) {
            check.classList.add("past");
        }
        if (currentTime - appointmentHour < 0) {
            check.classList.add("future");
        }
        loadItems(appointment, check);
    })
}

var loadItems = function(appointment, inputValue) {
    items = JSON.parse(localStorage.getItem("items"));
    if (!items) {
        items = [];
        localStorage.setItem("items", JSON.stringify(items));
    } else {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id  === appointment) {
                inputValue.value = items[i].text
            }
        }
    }
}
var changeItems = function(textInput, textId) {
    itemsNew = {
      id: textId,
      text: textInput
    }
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === itemsNew.id) {
        items[i].text = itemsNew.text
        localStorage.setItem("items", JSON.stringify(items))
        return null;
      }
    }
    items.push(itemsNew)
    localStorage.setItem("items", JSON.stringify(items));
}

$(".row").on("click", ".saveBtn", function(event) {
    console.log("event saved to local storage")
    var textSelect = $(this).parent().children()[1];
    var textInput = textSelect.value.trim();
    var textId = textSelect.id;
    changeItems(textInput, textId);
  })


checkTime();