// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    var descriptions;
    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        //if (navigator.connection.type === Connection.NONE) {
        //    navigator.notification.alert('An internet connection is required to continue');
        //} else {
        //    window.location = "http://www.sikh.events";
        //}
        //var targetUrl = "http://www.sikh.events";
        //var bkpLink = document.getElementById("bkpLink");
        //bkpLink.setAttribute("href", targetUrl);
        //bkpLink.text = targetUrl;
        //window.location.replace(targetUrl);
        document.body.classList.add(cordova.platformId);
        $.getJSON("http://www.sikh.events/getprograms.php?source=all", function (data) {

            console.log("testing");
            var items = [];
            $.each(data, function (key, val) {


                var sd = formatDate(val["sd"]);
                var ed = formatDate(val["ed"]);
                    items.push(
                        "<div class = \"cell\" id=\""+ val["id"] + "\">" +
                        "<div class='sd' start='" + sd[3]+"' end='"+ ed[3] +"'>" +
                    sd[0] + "<br>"+ sd[1] + "<br><br>" + sd[2] +" to <br>" + ed[2] +
                   "<br><br><button class=\"infoBtn\" val='" + val["description"] + "'><img class=\"info-btn\"src=\"images/infobox_info_icon.svg.png\"></button>" +
                   '<button class="icalBtn" val="' + val['id'] + '">i</button>  </div> ' +
                    "<div style=\"width:72%; float:left; top: 50%; \"> <div class=\"programTitle spaced\">" +
                    val["title"] +
                    "</div><div class=\"programSubtitle spaced\">" +
                    val["subtitle"] +
                    "</div> <div class=\"spaced\"> <a href=\"http://maps.google.com/?q=" +
                    val["address"] + "\">" +
                    val["address"] +
                    "</a></div>" +
                    val["phone"] + "<div class=\"spaced\">" +
                    "</div></div></div>"
                );
            });
 
            $( "<div/>", {
                "class": "my-new-list",
                html: items.join( "" )
            }).appendTo(".main-content");
document.getElementById('aboutBtn').addEventListener('click',showAbout);
            var btns = document.getElementsByClassName('infoBtn');//.addEventListener('click', showDescription);
           for (var i = 0; i < btns.length; i++) {
               btns[i].addEventListener('click', showDescription, false);
           }
           var icalBtns = document.getElementsByClassName('icalBtn');
           for (var i = 0; i < btns.length; i++) {
                icalBtns[i].addEventListener('click', exporttocal, false);
            }
        });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();