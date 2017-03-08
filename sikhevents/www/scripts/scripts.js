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
    var dt = new Date(d);
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
    var timestr = hrs + ":" + mins + " " + ampm;
    return [day, datestr, timestr];
}