//$(window).ready(function() {
//    alert('test');
// 
//});



function showDescription() {
    //alert(this.getAttribute("val"));
       navigator.notification.alert(
        this.getAttribute("val"),  // message
        alertDismissed,         // callback
        'Description',            // title
        'OK'                  // buttonName
    );
    //'" + val["description"] + "'
}

function alertDismissed() {
    // do something
}

function showAbout() {
    var msg = "Sikh Events is an app which will show Kirtan programs from around the world in one location. " +
        "Initially programs will be limited to the Bay Area, California but will be expanded to include other cities and countries. " +
        "We also plan to allow other sikh events in the future. " +
        "To submit a program, please visit the website: www.sikh.events";
    navigator.notification.alert(
      msg,  // message
      alertDismissed,         // callback
      'About',            // title
      'OK'                  // buttonName
  );
}

function formatDate(d) {
    try
    {
        //var dt = new Date(d);
        var dateArr = d.split(' ');
        var date1 = dateArr[0].split('-');
        var time1 = dateArr[1].split(':');
        //-1 from month because its 0 based
        var dt = new Date(date1[0], date1[1]-1, date1[2], time1[0], time1[1], time1[2]);

        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var day = days[dt.getDay()];
        var date = dt.getDate();
        var month = months[dt.getMonth()];
        var datestr = month + " " + date;
        var hrs = dt.getHours();
        var ampm = hrs < 12 ? "am" : "pm";
        hrs = hrs > 12 ? hrs - 12 : hrs == 0 ? 12 : hrs;
        var mins = dt.getMinutes();
        if (mins <= 9)
            mins = "0" + mins;
        var timestr = hrs + ":" + mins + " " + ampm;
        return [day, datestr, timestr,dt];
    } catch (ex) {
        return d; //if parsing/formatting failed, just show original date as is
    }
}

 
function exporttocal() {
    var id = this.getAttribute("val");
    var cell = $('#' + id);
    var title = cell.find('.programTitle').html();
    var addr = cell.find('a').html();
    var start = cell.find('.sd').attr("start");
    var startDate = new Date(start);
    var desc = cell.find('.infoBtn').attr("val");
    var end = cell.find('.sd').attr("end");
    var endDate = new Date(end);
    var success = function(message) { alert("Success: " + JSON.stringify(message)); };
    var error = function(message) {
        alert("Error: " + message);
    };
    window.plugins.calendar.createEventInteractively(title, addr, desc, startDate, endDate, success, error);
}