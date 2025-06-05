

const apiBaseURL =
    "https://data.etabus.gov.hk/v1/transport/kmb/eta/B002CEF0DBC568F5/91M/1";
/*fetch(apiBaseURL)
    .then(response => response.json())
    .then(data => console.log(data))
    .error(response => console.error(error))*/
const HKUST_S = "B002CEF0DBC568F5"; // HKUST South
const route = "91M";                // 91, 91M, 91P
const serviceType = "1";           // Should be 1
async function fetchData(stopId, route) {

    try {

        const response =
            await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/${stopId}/${route}/1`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        const outputEl = document.getElementById(route);
        let outputText = "";
        console.log("Fetched data:", data);
        data.data.forEach((bus, index) => {
            outputText += `Bus ${index + 1} Data Timestamp: ${bus.eta}\n`;
        });
        outputEl.innerText = outputText;
    }// works!


    catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("output").innerText = "Error fetching data.";
    }

    /*document.addEventListener("DOMContentLoaded", () => {
        for (let i = 0; i <= 2; i++) {
            setTimeout(function () {
                fetchData(HKUST_S, route, i);
                fetchData(HKUST_S, route, i + 1);
            }, 1000);

        }
    });*/
}
fetchData(HKUST_S, "91");
fetchData(HKUST_S, "91M");
/*
{ 
    "type": "ETA", 
    "version": "1.0", 
    "generated_timestamp": "2021-03-04T17:22:35+08:00", 
    "data": [ 
        { 
            "co": "KMB", 
            "route": "40", 
            "dir": "O", 
            "service_type": 1, 
            "seq": 7, 
            "stop": "A60AE774B09A5E44", 
            "dest_tc": "麗港城", 
            "dest_sc": "丽港城", 
            "dest_en": "LAGUNA CITY", 
            "eta_seq": 1, 
            "eta": "2021-03-04T17:25:51+08:00", 
            "rmk_tc": "", 
            "rmk_sc": "", 

            */
/*const apiBaseURL = "https://data.etabus.gov.hk";
//const stopId = "3592A0182BF020C7"; // HKUST North
const stopId = "B002CEF0DBC568F5"; // HKUST South
const route = "91M";                // Example route number
const serviceType = "1";           // Example service type

const etaEndpoint = `/v1/transport/kmb/eta/${stopId}/${route}/${serviceType}`;
console.log("Hello from external script!");
fetch(apiBaseURL + etaEndpoint)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(etaData => {
    console.log("ETA Data:", etaData);
    // Process ETA data here
  })
  .catch(error => {
    console.error("Error fetching ETA data:", error);
  });*/