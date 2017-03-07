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

function formatDate(d) {
    var dt = new Date(d);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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