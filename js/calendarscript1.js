var currentUpdateEvent;
var addStartDate;
var addEndDate;
var globalAllDay;

function updateEvent(event, element) {
    alert('updateEvent ' + event.description);

    //if ($(this).data("qtip")) $(this).qtip("destroy");

    //currentUpdateEvent = event;

    //$('#updatedialog').dialog('open');

    //$("#eventName").val(event.title);
    //$("#eventDesc").val(event.description);
    //$("#eventId").val(event.id);
    //$("#eventStart").text("" + event.start.toLocaleString());

    //if (event.end === null) {
    //    $("#eventEnd").text("");
    //}
    //else {
    //    $("#eventEnd").text("" + event.end.toLocaleString());
    //}

}

function updateSuccess(updateResult) {
    alert('updateSuccess ' + updateResult);
}

function deleteSuccess(deleteResult) {
    alert('deleteSuccess ' + deleteResult);
}

function addSuccess(addResult) {
// if addresult is -1, means event was not added
    alert("added key: " + addResult);

    //if (addResult != -1) {
    //    $('#calendar').fullCalendar('renderEvent',
	//					{
	//					    title: $("#addEventName").val(),
	//					    start: addStartDate,
	//					    end: addEndDate,
	//					    id: addResult,
	//					    description: $("#addEventDesc").val(),
	//					    allDay: globalAllDay
	//					},
	//					true // make the event "stick"
	//				);


    //    $('#calendar').fullCalendar('unselect');
    //}

}

function UpdateTimeSuccess(updateResult) {
    alert('UpdateTimeSuccess ' + updateResult);
}

function selectDate(start, end, allDay) {

    //$('#addDialog').dialog('open');


    //$("#addEventStartDate").text("" + start.toLocaleString());
    //$("#addEventEndDate").text("" + end.toLocaleString());


    //addStartDate = start;
    //addEndDate = end;
    //globalAllDay = allDay;
    alert('selectDate ' + allDay);

}

function updateEventOnDropResize(event, allDay) {

    alert(" updateEventOnDropResize allday: " + allDay);
    var eventToUpdate = {
        id: event.id,
        start: event.start

    };

    if (allDay) {
        eventToUpdate.start.setHours(0, 0, 0);

    }

    if (event.end === null) {
        eventToUpdate.end = eventToUpdate.start;

    }
    else {
        eventToUpdate.end = event.end;
        if (allDay) {
            eventToUpdate.end.setHours(0, 0, 0);
        }
    }

    eventToUpdate.start = eventToUpdate.start.format("dd-MM-yyyy hh:mm:ss tt");
    eventToUpdate.end = eventToUpdate.end.format("dd-MM-yyyy hh:mm:ss tt");

    PageMethods.UpdateEventTime(eventToUpdate, UpdateTimeSuccess);

}

function eventDropped(event, dayDelta, minuteDelta, allDay, revertFunc) {

    if ($(this).data("qtip")) $(this).qtip("destroy");

    updateEventOnDropResize(event, allDay);



}

function eventResized(event, dayDelta, minuteDelta, revertFunc) {

    if ($(this).data("qtip")) $(this).qtip("destroy");

    updateEventOnDropResize(event);

}

function checkForSpecialChars(stringToCheck) {
    var pattern = /[^A-Za-z0-9 ]/;
    return pattern.test(stringToCheck); 
}



