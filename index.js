function report(selection) {
    position = navigator.geolocation.getCurrentPosition(send_data)
}

const backend_url = 'https://clownfish-app-y6vt9.ondigitalocean.app/'

function send_data (position) {
    const date = new Date();

    $.post( backend_url + "/add_incident", 
    { long: position.coords.longitude, lat : position.coords.latitude, email : "user@gmail.com", date : date },
    function(returnedData){
        console.log(returnedData);
    });

    alert("Thank you for reporting. We'll address this issue as soon as possible.")
}




function verify_user() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    $.post( backend_url + "/verify_user", 
    { email: email, password: password })    
        .done(function(msg){ 
            window.location = "buttons.html"; // Redirecting to other page.
         })
        .fail(function(xhr, status, error) {
            // error handling
            
        });

}





legit_email = 'user@gmail.com'
legit_password = 'password'
function validate_login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var credentials_error = document.getElementById("credentials_error");

    if ( email == legit_email && password == legit_password){
        window.location = "buttons.html"; // Redirecting to other page.
        return false;
    } 
}