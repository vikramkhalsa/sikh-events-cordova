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
        $.getJSON("http://www.sikh.events/getprograms.php", function (data) {

            console.log("testing");
            var items = [];
            $.each(data, function (key, val) {
                var sd = formatDate(val["sd"]);
                var ed = formatDate(val["ed"]);
                    items.push(
                        "<div class = \"cell\"> " +
                        "<div style=\"width:30%; float:left; font-size:1.1em;  top: 50%; \">" +
                    sd.join("<br>") +"<br> to <br>" + ed[2] +
                   "<br><br> <button class=\"infoBtn\" val='" + val["description"]+"'><img class=\"info-btn\"src=\"images/infobox_info_icon.svg.png\"></button> </div> " +
                    "<div style=\"width:70%; float:left;\"> <div class=\"programTitle\">" +
                    val["title"] +
                    "</div><br> <div class=\"programSubtitle\">" +
                    val["subtitle"] +
                    "</div><br> <a href=\"http://maps.google.com/?q=" +
                    val["address"] + "\">" +
                    val["address"] +
                    "</a><br>" +
                    val["phone"] +
                    "<br></div>"
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
        });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();