(function () {
    const infoEl = document.getElementById("visitorInfo");
    const statusEl = document.getElementById("connectionStatus");
    const timeEl = document.getElementById("terminalTimestamp");

    async function fetchVisitorInfo() {
        try {
            const res = await fetch("https://ipapi.co/json/");
            if (!res.ok) throw new Error("primary lookup failed");
            const data = await res.json();
            if (!data || data.error) throw new Error("primary lookup failed");
            infoEl.textContent = `$ IP_ADDR  ${data.ip}`;
        } catch (err) {
            try {
                const res = await fetch("https://api.ipify.org?format=json");
                const data = await res.json();
                infoEl.textContent = `$ IP_ADDR  ${data.ip}`;
            } catch (err2) {
                infoEl.textContent = "$ Unable to fetch visitor data";
            }
        }
    }

    function updateConnectionStatus() {
        const isOnline = navigator.onLine;
        statusEl.textContent = isOnline ? "● ONLINE" : "● OFFLINE";
    }

    function updateTimestamp() {
        const utcTime = new Date().toLocaleTimeString("en-GB", {
            timeZone: "UTC",
            hour12: false,
        });
        timeEl.textContent = utcTime + " UTC";
    }

    fetchVisitorInfo();
    updateConnectionStatus();
    updateTimestamp();
    setInterval(updateTimestamp, 1000);
    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);
})();
