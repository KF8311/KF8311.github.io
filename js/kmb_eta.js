function formatDateGMT8(date) {
    const options = {
        timeZone: 'Asia/Hong_Kong', // GMT+8 zone
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return new Date(date).toLocaleString('en-GB', options);
}
const apiBaseURL =
    "https://data.etabus.gov.hk/v1/transport/kmb/eta/B002CEF0DBC568F5/91M/1";
/*fetch(apiBaseURL)
    .then(response => response.json())
    .then(data => console.log(data))
    .error(response => console.error(error))*/
const REFRESH_TIME = 2000;
const HKUST_CTB = "003130"; // HKUST North for CTB
const HKUST_N = ["3592A0182BF020C7", "B3E60EE895DBBF06", "C1AAFE0EB8BD89C7"]; // HKUST North
const HKUST_S = ["B002CEF0DBC568F5", "E9018F8A7E096544"]; // HKUST South
const route = "91M";                // 91, 91M, 91P
const SERVICE_TYPE = "1";           // Should be 1

function calculateTimeDifference(etaTime, nowTime) {
    const etaDate = new Date(etaTime);
    const nowDate = new Date(nowTime);
    const diffMs = etaDate.getTime() - nowDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes;
}
async function kmb_fetchData(stopIds, route) {

    try {
        let response; let data = null;
        for (const stopId of stopIds) {
            response =
                await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/${stopId}/${route.split('_')[0]}/${SERVICE_TYPE}`);
            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }
            let temp_data = await response.json();
            if (!temp_data.data || temp_data.data.length === 0) { continue; }
            else {
                if (temp_data.data.length > 0) {
                    data = temp_data;
                    break;
                }

            }

        }


        const outputEl = document.getElementById(route);
        outputEl.innerHTML = "";
        // default for Not in Service route
        let busHtml = "";
        if (!data || !data.data || data.data.length === 0) {
            // Data is empty
            console.log("No valid bus data is available.");
            // You can insert a message into the DOM, for example:
            const outputEl = document.getElementById(route);
            outputEl.innerHTML = `<div style="margin: 5px 0;">This bus service is not available.</div>`;
            return;
        }

        //let outputText = "";
        console.log("Fetched data:", data);
        let countBus = 0;
        data.data.forEach((bus, index) => {
            //const now = new Date(nowISO);

            const etaDate = new Date(bus.eta);
            const diffMin = calculateTimeDifference(bus.eta, bus.data_timestamp);
            const nowFormatted = formatDateGMT8(bus.eta).substring(12, 17);
            if (diffMin >= 0) {
                countBus++;
                if (index === 0) {
                    busHtml = `<div style="margin: 5px 0; color: #FFFF00;">${nowFormatted} | ${diffMin} mins | `;
                }
                else {
                    busHtml = `<div style="margin: 5px 0;">${nowFormatted} | ${diffMin} mins | `;
                }
                //let busHtml = `<div style="margin: 5px 0;">${nowFormatted} | ${diffMin} mins | `;
                if (bus.rmk_tc === "原定班次") {
                    if (index === 0) {
                        busHtml += `<span style="color: #FFFF00">*</span>`;
                    }
                    else {
                        busHtml += `<span style="color: white;">*</span>`;
                    }

                }
                busHtml += `</div>`;
                outputEl.insertAdjacentHTML('beforeend', busHtml);
            }


            // ${index + 1}
        });
        if (countBus === 0) {
            // Special case: no buses at all for this direction
            busHtml = `<div style="margin: 5px 0;">This bus service is not available.</div> `;
            outputEl.insertAdjacentHTML('beforeend', busHtml);
            return;
        }


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
async function ctb_fetchData(stopId, route, dir) {

    try {

        const response =
            await fetch(`https://rt.data.gov.hk//v2/transport/citybus/eta/CTB/${stopId}/${route}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        const outputEl = document.getElementById(`${route}_${dir}`);
        outputEl.innerHTML = "";
        let busHtml = "";
        if (!data.data || data.data.length === 0) {
            // Special case: no buses at all
            busHtml = `<div style="margin: 5px 0;">This bus service is not available.</div> `;
            outputEl.insertAdjacentHTML('beforeend', busHtml);
            return;
        }
        let countBus = 0;
        console.log("Fetched data:", data);
        data.data.forEach((bus, index) => {
            //const now = new Date(nowISO); // Or you have date object

            const etaDate = new Date(bus.eta);
            const diffMin = calculateTimeDifference(bus.eta, bus.data_timestamp);
            const nowFormatted = formatDateGMT8(bus.eta).substring(12, 17);
            if (diffMin >= 0) {
                if (bus.dir === dir) {
                    countBus++;
                    if (countBus === 1) {
                        busHtml = `<div style="margin: 5px 0; color: #FFFF00;">${nowFormatted} | ${diffMin} mins | `;
                    }
                    else {
                        busHtml = `<div style="margin: 5px 0;">${nowFormatted} | ${diffMin} mins | `;
                    }
                    busHtml += `</div>`;
                    outputEl.insertAdjacentHTML('beforeend', busHtml);
                }

            }


            //let busHtml = `<div style="margin: 5px 0;">${nowFormatted} | ${diffMin} mins | `;


            // ${index + 1}
        });
        if (countBus === 0) {
            // Special case: no buses at all for this direction
            busHtml = `<div style="margin: 5px 0;">This bus service is not available.</div> `;
            outputEl.insertAdjacentHTML('beforeend', busHtml);
            return;
        }



    }



    catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("output").innerText = "Error fetching data.";
    }


}
// HKUST South ETA Refresh
setInterval(() => kmb_fetchData(HKUST_S, "91_S"), REFRESH_TIME);
setInterval(() => kmb_fetchData(HKUST_S, "91M_S"), REFRESH_TIME);
setInterval(() => kmb_fetchData(HKUST_S, "91P_S"), REFRESH_TIME);
setInterval(() => kmb_fetchData(HKUST_S, "291P_S"), REFRESH_TIME);


// 792M: I for TKO, O for Sai Kung
// HKUST North ETA Refresh
// KMB
setInterval(() => kmb_fetchData(HKUST_N, "91_N"), REFRESH_TIME);
setInterval(() => kmb_fetchData(HKUST_N, "91M_N"), REFRESH_TIME);
// Citybus
setInterval(() => ctb_fetchData(HKUST_CTB, "792M", "I"), REFRESH_TIME);
setInterval(() => ctb_fetchData(HKUST_CTB, "792M", "O"), REFRESH_TIME);
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