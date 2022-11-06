function report(selection) {
    position = navigator.geolocation.getCurrentPosition(send_data)
}

const backend_url = 'https://clownfish-app-y6vt9.ondigitalocean.app'

function send_data (position) {
    const date = new Date();

    $.post( backend_url + "/add_incident", 
    { long: position.coords.longitude, lat : position.coords.latitude, email : "user@gmail.com", date : date },
    function(returnedData){
        console.log(returnedData);
    });

    alert("Thank you for reporting. We'll address this issue as soon as possible.")
}




// function verify_user() {
//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;

//     $.post( backend_url + "/verify_user", 
//     { email: email, password: password })    
//         .done(function(msg){ 
//             window.location = "buttons.html"; // Redirecting to other page.
//          })
//         .fail(function(xhr, status, error) {
//             // error handling
            
//         });

// }





legit_email = 'user@gmail.com'
legit_password = 'password'
function validate_login() {
    console.log("Validating login")
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var credentials_error = document.getElementById("credentials_error");

    //make network request to backend to verify user
    verify_user(email, password)
    
    
    
}
const verify_user = async (email, password) => {
    const response = await fetch(backend_url + "/verify_user", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    //if status is success, redirect to buttons.html else flash error message
    if (data.status == "success") {
        window.location = "buttons.html";
    }
    else {
        alert("Invalid credentials")
    }
    
}

