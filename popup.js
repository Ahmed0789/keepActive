document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle-active");
    const intervalInput = document.getElementById("interval");

    // Load values from chrome.storage.local
    chrome.storage.local.get(["isActive", "interval"], (result) => {
        toggle.checked = result.isActive ?? false;
        intervalInput.value = result.interval ?? 3;
    });

    // Save isActive value when toggled
    toggle.addEventListener("change", () => {
        const isActive = toggle.checked;
        chrome.storage.local.set({ isActive }, () => {
            console.log("Activity simulation is now:", isActive ? "Enabled" : "Disabled");
        });
    });

    // Save interval when changed
    intervalInput.addEventListener("change", () => {
        const interval = Number(intervalInput.value);
        chrome.storage.local.set({ interval }, () => {
            console.log("Activity interval set to:", interval, "minutes");
        });
    });
});
