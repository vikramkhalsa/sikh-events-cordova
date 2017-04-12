//$(window).ready(function() {
//    alert('test');
// 
//});


//show a specific event's description
function showDescription() {
       navigator.notification.alert(
        descriptions[this.getAttribute("val")],  // message
        alertDismissed,         // callback
        'Description',            // title
        'OK'                  // buttonName
    );
}

function alertDismissed() {
    // do something
}

//show info about the app in a popup/alert
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

//parse date into js object, return array of date split into parts for displaying
function formatDate(d) {
    try
    {
        //var dt = new Date(d);
        var dateArr = d.split(' ');
        var date1 = dateArr[0].split('-');
        var time1 = dateArr[1].split(':');
        //-1 from month because its 0 based
        var dt = new Date(date1[0], date1[1]-1, date1[2], time1[0], time1[1], time1[2]);
        if (isNaN(dt.getTime())) {
            throw "Unable to convert date";
        }
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
        return false; //if parsing/formatting failed, just show original date as is
    }
}

 //export event to system calendar
function exporttocal() {
    var id = this.getAttribute("val");
    var cell = $('#' + id);
    var title = cell.find('.programTitle').html();
    var addr = cell.find('a').html();
    var start = cell.find('.sd').attr("start");
    var startDate = new Date(start);
    var desc = descriptions[id];
    var end = cell.find('.sd').attr("end");
    var endDate = new Date(end);
    var success = function (message) { //alert("Success: " + JSON.stringify(message)); 
    };
    var error = function(message) {
        //alert("Error: " + message);
    };
    window.plugins.calendar.createEventInteractively(title, addr, desc, startDate, endDate, success, error);
}

function showPage() {
    $(".isangat").css("display", "block");
    $(".sikhevents").css("display", "none");
    myApp.closePanel();
}

function showlist() {
    $('.navbtn').css("background-color", "white");

    $(this).css("background-color", "#bcd4ec");
    $('#headerTitle').text($(this).find(".item-title").text());
    var src = this.getAttribute("val");

    $(".isangat").css("display", "none");
    $(".sikhevents").css("display", "none");
    $(".ekhalsa").css("display", "none");

    $('.'+src).css("display", "block");
    myApp.closePanel();

}

var descriptions = {};

function createEvents(val, items,source) {
    var desc = "";
    if ("description" in val) {
        desc = val["description"];
    }
    descriptions[val["id"]] = val["description"];

    var sd = val["sd"];
    var ed = val["ed"];
    var timeStr= "";
    var s = formatDate(val["sd"]);
    var e = formatDate(val["ed"]);
    if (s) {
        sd = s;
        if (e)
            ed = e;
        timeStr = "<div class='sd' start='" + sd[3] + "' end='" + ed[3] + "'>" +
           sd[0] + "<br>" + sd[1] + "<br><br>" + sd[2] + " to <br>" + ed[2];
    }else {
        timeStr = "<div class='sd'>" + sd + " to <br>" + ed;
        }

    items.push(
        "<div class='cell " + source + "' id='" + val["id"] + "'>" +
       timeStr + 
   "<br><br>" +
        "<button class='infoBtn' val='" + val['id'] + "'><img class='info-btn' src='css/images/icons-svg/info-black.svg'></button>" +
   '<button class="icalBtn" val="' + val['id'] + '"><img class="info-btn"src="css/images/icons-svg/calendar-black.svg"></button> ' +
    '</div> ' +
    "<div style=\"width:72%; float:left; top: 50%; \"> <div class=\"programTitle spaced\">" +
    val["title"] +
    "</div><div class=\"programSubtitle spaced\">" +
    val["subtitle"] +
    "</div> <div class='spaced'> <a href='maps://?q=" +
    val["address"] + "' class=\"map-link\">" +
    val["address"] +
    "</a></div>" +
    val["phone"] + "<div class='spaced'>" +
    "</div></div></div>"
);
}

function systemLink(url) {
  cordova.InAppBrowser.open(url, '_system');
}
