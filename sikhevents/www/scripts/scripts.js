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