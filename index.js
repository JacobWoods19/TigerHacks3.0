function report(selection) {
    position = navigator.geolocation.getCurrentPosition(send_data)
}

const backend_url = 'https://clownfish-app-y6vt9.ondigitalocean.app'


function getLocation() {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(handle_location);
      
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}

function handle_location(position) {
    localStorage.setItem("lat", position.coords.latitude);
    localStorage.setItem("lon", position.coords.longitude);
}

function create_report(incident_type) {
    var lat = localStorage.getItem("lat");
    var lon = localStorage.getItem("lon");
    var email = localStorage.getItem("email");
    var data = {
        "incident_type": incident_type,
        "lat": lat,
        "lon": lon,
        "email": email
    }
    submit_incident(data);
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





function validate_login() {
    console.log("Validating login")
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var credentials_error = document.getElementById("credentials_error");

    //make network request to backend to verify user
    verify_user(email, password)
    console.log("email: " + email + " password: " + password)
}
//submit incident to backend
const submit_incident = async (data) => {
    // build url with query params
    // example: https://clownfish-app-y6vt9.ondigitalocean.app/add_incident?date=2022-10-12&lat=38.9590&long=-92.3233&incident_type=Pothole&email=Don_Waters@gmail.com
    var url = backend_url + "/add_incident?date=" + data.date + "&lat=" + data.lat + "&long=" + data.lon + "&incident_type=" + data.incident_type + "&email=" + data.email
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({long: data.long, lat: data.lat, email: data.email, date: data.date}),
    });
    const return_data = await response.json();
    console.log(return_data)
    return return_data;
}

const verify_user = async (email, password) => {
    const response = await fetch(backend_url + "/verify_user?email=" +email +"&password="+password, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    console.log(data)
    //if status is success, redirect to buttons.html else flash error message
    if (data.status == "success") {
        //save user email in local storage
        localStorage.setItem("email", email)
        window.location = "buttons.html";
    }
    else {
        alert("Invalid credentials")
    }
    
}
getLocation()
