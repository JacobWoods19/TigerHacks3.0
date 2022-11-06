const getIncidents = async (alert_type) => {
    const response = await fetch('https://clownfish-app-y6vt9.ondigitalocean.app/get_reports_for_email?email=' + localStorage.getItem("email"));
    const myJson = await response.json(); 
    console.log(myJson);
    //do some error checking
    
    //create a table from the data returned
    let table = document.getElementById("history_table");
    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    // example response:
    // [
    //     [
    //         "087faac7-173f-442c-a4bd-8e83e2caa456",
    //         "testuser1",
    //         "Sun, 06 Nov 2022 00:00:00 GMT",
    //         "Snow",
    //         "-92.33008543961094",
    //         "38.94632438711452",
    //         0
    //     ],
    //     [
    //         "351892a2-621b-4dee-878b-83a64aa76ab2",
    //         "testuser1",
    //         "Sun, 06 Nov 2022 00:00:00 GMT",
    //         "Pothole",
    //         "-92.33003226691092",
    //         "38.94638549769066",
    //         0
    //     ]]
    for (let i = 0; i < myJson.length; i++) {
        let row = document.createElement("tr");
        tableBody.appendChild(row);
        for (let j = 0; j < myJson[i].length; j++) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode(myJson[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
    }

    // add each long and lat to the map
}
// run function to get incidents
getIncidents();