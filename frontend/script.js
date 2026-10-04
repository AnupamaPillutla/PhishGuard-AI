
const scanBtn = document.getElementById("scanBtn");
const urlInput = document.getElementById("urlInput");

const resultCard = document.getElementById("resultCard");
const resultTitle = document.getElementById("resultTitle");
const resultBadge = document.getElementById("resultBadge");
const resultUrl = document.getElementById("resultUrl");
const confidence = document.getElementById("confidence");
const riskLevel = document.getElementById("riskLevel");
const resultReason = document.getElementById("resultReason");

const scanList = document.getElementById("scanList");

const totalScans = document.getElementById("totalScans");
const safeUrls = document.getElementById("safeUrls");
const phishingUrls = document.getElementById("phishingUrls");


// ===============================
// Load saved statistics
// ===============================

let total =
    Number(localStorage.getItem("totalScans")) || 1248;

let safe =
    Number(localStorage.getItem("safeUrls")) || 932;

let phishing =
    Number(localStorage.getItem("phishingUrls")) || 316;


// ===============================
// Load scan history
// ===============================

let scanHistory =
    JSON.parse(localStorage.getItem("scanHistory")) || [];


// ===============================
// Display Scan
// ===============================

function displayScan(scan) {

    const scanRow = document.createElement("div");

    scanRow.className = "scan-row";

    const resultClass =
        scan.prediction === "Phishing"
            ? "danger"
            : "safe";

    scanRow.innerHTML = `
        <div>
            <strong>${scan.url}</strong>
            <small>${scan.time}</small>
        </div>

        <span class="${resultClass}">
            ${scan.prediction.toUpperCase()}
        </span>
    `;

    scanList.prepend(scanRow);
}


// ===============================
// Update Statistics
// ===============================

function updateStatistics() {

    totalScans.textContent = total;
    safeUrls.textContent = safe;
    phishingUrls.textContent = phishing;

    localStorage.setItem(
        "totalScans",
        total
    );

    localStorage.setItem(
        "safeUrls",
        safe
    );

    localStorage.setItem(
        "phishingUrls",
        phishing
    );
}


// ===============================
// Scan URL
// ===============================

scanBtn.addEventListener("click", async function () {

    const url = urlInput.value.trim();

    if (url === "") {

        alert("Please enter a URL.");

        return;
    }


    // Button loading state

    scanBtn.disabled = true;

    scanBtn.textContent = "Scanning...";


    try {

        // ===============================
        // Send URL to FastAPI
        // ===============================

        const response = await fetch(
            "http://127.0.0.1:8000/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    url: url
                })
            }
        );


        // ===============================
        // Check API response
        // ===============================

        if (!response.ok) {

            throw new Error(
                "API request failed"
            );
        }


        // ===============================
        // Read API result
        // ===============================

        const result =
            await response.json();


        console.log(
            "PhishGuard Result:",
            result
        );


        // ===============================
        // Show Result Card
        // ===============================

        resultCard.classList.remove("hidden");


        // ===============================
        // Display URL
        // ===============================

        resultUrl.textContent =
            result.url;


        // ===============================
        // Display Prediction
        // ===============================

        if (
            result.prediction === "Phishing"
        ) {

            resultTitle.textContent =
                "⚠️ Phishing Website";

            resultBadge.textContent =
                "PHISHING";

            resultBadge.className =
                "danger";

            phishing++;

        }

        else {

            resultTitle.textContent =
                "✅ Safe Website";

            resultBadge.textContent =
                "SAFE";

            resultBadge.className =
                "safe";

            safe++;
        }


        // ===============================
        // Confidence
        // ===============================

        confidence.textContent =
            result.confidence + "%";


        // ===============================
        // Risk Level
        // ===============================

        riskLevel.textContent =
            result.risk_level.toUpperCase();


        // ===============================
        // Detection Reason
        // ===============================

        resultReason.textContent =
            result.reason;


        // ===============================
        // Update Total Scans
        // ===============================

        total++;


        // ===============================
        // Update Dashboard Statistics
        // ===============================

        updateStatistics();


        // ===============================
        // Create Scan History Object
        // ===============================

        const scan = {

            url: result.url,

            prediction:
                result.prediction,

            confidence:
                result.confidence,

            risk:
                result.risk_level,

            reason:
                result.reason,

            time: new Date().toLocaleString()
        };


        // ===============================
        // Save Scan History
        // ===============================

        scanHistory.unshift(scan);


        // Keep only latest 20 scans

        scanHistory =
            scanHistory.slice(0, 20);


        localStorage.setItem(
            "scanHistory",
            JSON.stringify(scanHistory)
        );


        // ===============================
        // Display New Scan
        // ===============================

        displayScan(scan);


        // Clear input

        urlInput.value = "";


    }

    catch (error) {

        console.error(
            "PhishGuard Error:",
            error
        );


        alert(
            "Unable to connect to PhishGuard API.\n\n" +
            "Make sure the backend is running on port 8000."
        );

    }


    finally {

        scanBtn.disabled = false;

        scanBtn.textContent =
            "Scan URL";
    }

});


// ===============================
// Load Saved Scan History
// ===============================

scanHistory.forEach(
    function (scan) {

        displayScan(scan);

    }
);


// ===============================
// Initialize Statistics
// ===============================

updateStatistics();

