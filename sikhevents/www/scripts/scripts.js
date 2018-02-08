//$(window).ready(function() {
//    alert('test');
// 
//});


//show a specific event's description
function showDescription() {
    var id = this.getAttribute("val");

    var desc = events[id].description;
    var title = events[id].title;

    var imagenode = "";
    if (events[id].imageurl) {
        var url = events[id].imageurl;
        imagenode = '<img src="' + url + '"  width="100%"/>';
    }

    var linknode = "";
    if (events[id].siteurl) {
        var siteurl = events[id].siteurl;
        linknode = '<a href="' + siteurl + '">'+siteurl+'</a>';
    } // for future if events have links, show them here. Don't know if it will actually work yet

    var popupHTML = '<div class="popup">' +
        '<div class="content-block">' +
        '<p><a style="float:right" href="#" class="close-popup">Close</a></p>' +
        '<h3>' + title + '</h3>' +
         '<p>' + desc + '</p>' +
        linknode +
        imagenode +
        '</div>' +
        '</div>';

   // desc = desc.replace(/<br>/g, '\n');
    //desc = desc.replace(/<.?b>/g, '');

    myApp.popup(popupHTML);


    //   navigator.notification.alert(
    //    desc,  // message
    //    alertDismissed,         // callback
    //    'Description',            // title
    //    'OK'                  // buttonName
    //);
}

function alertDismissed() {
    // do something
}

//show info about the app in a popup/alert
function showAbout() {
    var msg = "Sikh Events is a platform which shows Kirtan programs and other Sikh events from around the world in one convenient location. " +
        "We are continuously adding support for more regions and different locations" +
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
        //if (mins == 0) {
        //    mins = "";  //consider not showing minutes for times which are at :00
        //}
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
    var desc = events[this.getAttribute("val")].description;
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
    $('.navbtn').css("background-color", "#1c2e4a");

    $(this).css("background-color", "#466eb4");
    var src = this.getAttribute("val");
    var filterBtn = $('#filter');

    if (src === "sikhevents") {
        getEvents("");
        filterBtn.show();
    }
    else if (src === "isangat") {
        getiSangat();
        filterBtn.hide();

    }
    else if (src === "ekhalsa") {
        geteKhalsa();
        filterBtn.hide();
    }
    else if (src === "akjorg") {
        getEvents("?source=akjorg");
        filterBtn.hide();
    }
    else if (src === "samagams") {
        getEvents("?source=samagams");
        filterBtn.hide();
    }
    else {
        getEvents("?region=" + src);
        filterBtn.show();
    }

    currentRgn = $(this).find(".item-title").text();
    $('#headerTitle').text(currentRgn);
    $('#filtericon').css('background-color', 'transparent');

    //$('.'+src).css("display", "block");
    myApp.closePanel();

}

var events = {};

function createEvents(val, items,source) {
    var desc = "";
    if ("description" in val) {
        desc = val["description"];
    }
    var phone = "";
    if (val["phone"])
        phone = val["phone"];

    events[val['id']] = val;
    //var imagebutton = "";
    //if (val["imageurl"]) {
    //    imagebutton = '<a class="imageBtn"href="#" val=' + val['id'] +
    //        '>View Poster</a>';
    //}

    var sd = val["sd"];
    var ed = val["ed"];
    var timeStr= "";
    var s = formatDate(val["sd"]);
    var e = formatDate(val["ed"]);
    if (s) {
        sd = s;
        if (e)
            ed = e;
        timeStr = "<div class='sd' start='" + sd[3] + "' end='" +ed[3] + "'>" +
            sd[0] + "<br>" + sd[1];
        if (sd[1] != ed[1])
            timeStr = timeStr + " - <br>" + ed[1]; // if multi day event, show end date too.

        if (val["allday"] != 1)
            timeStr = timeStr + "<br><br>" + sd[2] + " to <br>" + ed[2]; //if not an all day event, show start and end times
    }else {
        timeStr = "<div class='sd'>" + sd + " to <br>" + ed;
        }

    items.push(
        "<div class='cell " + source + "' id='" + val["id"] + "'>" +
       timeStr + 
   "<br><br>" +
        "<button class='infoBtn iconBtn' val='" + val['id'] + "'><img class='info-btn' src='css/images/icons-svg/info-black.svg'></button>" +
   '<button class="icalBtn iconBtn" val="' + val['id'] + '"><img class="info-btn" src="css/images/icons-svg/calendar-black.svg"></button> ' +
    '</div> ' +
    "<div style=\"width:72%; float:left; top: 50%; \"> <div class=\"programTitle spaced\">" +
    val["title"] +
    "</div><div class=\"programSubtitle spaced\">" +
    val["subtitle"] +
    "</div> <div class='spaced'> <a href='maps://?q=" +
    val["address"] + "' class=\"map-link\">" +
    val["address"] +
    "</a></div>" +
    phone + "<div class='spaced'>" +
    "</div></div></div>"
);
}

function systemLink(url) {
  cordova.InAppBrowser.open(url, '_system');
}


function getEvents(querystr) {
    events = {};
    var eventurl = "https://www.sikh.events/getprograms.php";

    myApp.showIndicator();
    $.getJSON(eventurl + querystr,
        function(data) {
            console.log("Loading sikhevents");
            var items = [];
            $.each(data,
                function(key, val) {
                    createEvents(val, items, "sikhevents");                
                });

            $(".main-list")
                .html($("<div/>",
                {
                    "class": "my-new-list",
                    html: items.join("")
                }));
            $(".infoBtn").on("click", showDescription);
            $(".icalBtn").on('click', exporttocal);
            $$('.imageBtn').on('click', function () {
                    var id = this.getAttribute("val");
                    var title = events[id].title;
                    var url = events[id].imageurl;
                    var popupHTML = '<div class="popup">' +
                        '<div class="content-block">' +
                        '<p><a style="float:right" href="#" class="close-popup">Close</a></p><h3>' +
                        title +
                        '</h3><img src="' + url + '"  width="100%"/>' +
                        '</div>' +
                        '</div>';
                    myApp.popup(popupHTML);
            });

            //only add margin between buttons if width is above a certain minimum, 
            //otherwise they go into 2 rows (iphones)
            var w = $(".sd").width();
            if (w > 80) {
                $(".infoBtn").css("margin-right", "15px");
            }

            // Open map links with InAppBrowser
            $('body').on('click', '.map-link', function (e) {
                systemLink($(this).attr('href'));
            });

            //update filtercounts now
            updateFilters();

            myApp.hideIndicator();


        });
}

function getiSangat() {

    events = {};
    myApp.showIndicator();
    //load from isangat
    $.getJSON("https://www.sikh.events/getprograms.php?source=isangat", function (data) {
        console.log("loading isangat");
        var items = [];
        $.each(data.programs, function (key, val) {

            createEvents(val, items, "isangat");
        });

        $(".main-list").html($("<div/>",
         {
             "class": "my-new-list",
             html: items.join("")
         }));

        $(".infoBtn").on("click", showDescription);
        $(".icalBtn").on('click', exporttocal);

        //only add margin between buttons if width is above a certain minimum, 
        //otherwise they go into 2 rows (iphones)
        var w = $(".sd").width();
        if (w > 80) {
            $(".infoBtn").css("margin-right", "15px");
        }

        // Open map links with InAppBrowser
        $('body').on('click', '.map-link', function (e) {
            systemLink($(this).attr('href'));
        });
        myApp.hideIndicator();
    });
}

function geteKhalsa() {
    events = {};

    myApp.showIndicator();
    //load from ekhalsa
    $.getJSON("https://www.sikh.events/getprograms.php?source=ekhalsa",
        function(data) {
            console.log("loading ekhalsa");
            var items = [];
            $.each(data,
                function(key, val) {

                    createEvents(val, items, "ekhalsa");
                });

            $(".main-list")
                .html($("<div/>",
                {
                    "class": "my-new-list",
                    html: items.join("")
                }));

            // $(".ekhalsa").css("display", "none");
            $(".icalBtn").hide();
            $(".infoBtn").hide();

            //only add margin between buttons if width is above a certain minimum, 
            //otherwise they go into 2 rows (iphones)
            var w = $(".sd").width();
            if (w > 80) {
                $(".infoBtn").css("margin-right", "15px");
            }

            // Open map links with InAppBrowser
            $('body').on('click', '.map-link', function (e) {
                systemLink($(this).attr('href'));
            });
            myApp.hideIndicator();
        });
}

function filterevents(type) {
    var items = [];
    var filterCheckerFn;
    if (type == 'other') {
        filterCheckerFn = 
            function(key, val) {
                var eventType = val.type;
                if (eventType != "kirtan" && eventType != 'katha' && eventType != 'camp' && eventType != 'seva') {
                    createEvents(val, items, "sikhevents");
                }
            };
    } else {
        filterCheckerFn = 
       function (key, val) {
           var eventType = val.type;
            if (eventType == type || type === "") {
               createEvents(val, items, "sikhevents");
           }
       };
    }

    $.each(events, filterCheckerFn);

        $(".main-list")
            .html($("<div/>",
            {
                "class": "my-new-list",
                html: items.join("")
            }));
        $(".infoBtn").on("click", showDescription);
        $(".icalBtn").on('click', exporttocal);
        $$('.imageBtn').on('click', function () {
            var id = this.getAttribute("val");
            var title = events[id].title;
            var url = events[id].imageurl;
            var popupHTML = '<div class="popup">' +
                '<div class="content-block">' +
                '<p><a style="float:right" href="#" class="close-popup">Close</a></p><h3>' +
                title +
                '</h3><img src="' + url + '"  width="100%"/>' +
                '</div>' +
                '</div>';
            myApp.popup(popupHTML);
        });
    if (type)
        $('#headerTitle').text(currentRgn + ' (' + type.substr(0, 1).toUpperCase() + type.substr(1) + ')');
    else
        $('#headerTitle').text(currentRgn);

}

var currentRgn = "Sikh Events";

function updateFilters() {

    var eventsCount = 0;
    var kirtanCount = 0;
    var kathaCount = 0;
    var campCount = 0;
    var sevaCount = 0;
    //var discussionCount = 0;
    //var samagamCount = 0;
    var otherCount = 0;

    var eventsAr = Object.keys(events);
    eventsCount = eventsAr.length;


    for (var i = 0; i < eventsAr.length; i++) {
        let eventType = events[eventsAr[i]].type;
        switch (eventType) { 
            case "kirtan":
                kirtanCount += 1;
                break;
            case "katha":
                kathaCount += 1;
                break;
            case "camp":
                campCount += 1;
                break;
            case "seva":
                sevaCount += 1;
                break;
            default:
                otherCount += 1;
        }

    }

    //add filter buttons
    $$('#filter').on('click', function () {
        var buttons = [
            {
                text: 'Filter Event Type',
                label: true
            },
            {
                text: 'All Events (' + eventsCount + ')',
                onClick: function () {
                    filterevents("");
                    $('#filtericon').css('background-color', 'transparent');
                }
            },
            {
                text: 'Kirtan (' + kirtanCount + ')',
                onClick: function () {
                    filterevents("kirtan");
                    $('#filtericon').css('background-color', 'lightgrey');
                }
            },
            {
                text: 'Katha (' + kathaCount + ')',
                onClick: function () {
                    filterevents("katha");
                }
            },
            {
                text: 'Camp (' + campCount + ')',
                onClick: function () {
                    filterevents("camp");
                }
            },
            {
                text: 'Seva (' + sevaCount + ')',
                onClick: function () {
                    filterevents("seva");
                }
            },
            {
                text: 'Other (' + otherCount + ')',
                onClick: function () {
                    filterevents("other");
                }
            },
            {
                text: 'Cancel',
                color: 'red'
            }
        ];
        myApp.actions(buttons);
    });
}
