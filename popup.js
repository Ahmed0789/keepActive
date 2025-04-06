document.addEventListener("DOMContentLoaded", async () => {
    const toggle = document.getElementById("toggle-active");

    // Load the current state from storage
    await chrome.storage.local.get(["isActive"], (result) => {
        toggle.checked = result.isActive || false;
    });

    // Save the state when the toggle is changed
    toggle.addEventListener("change", async () => {
        const isActive = toggle.checked;
        await chrome.storage.local.set({ isActive });
        console.log("Activity simulation is now:", isActive ? "Enabled" : "Disabled");
    });

    const intervalInput = document.getElementById("interval");

    // Load and save the activity interval
    await chrome.storage.local.get(["interval"], (result) => {
        intervalInput.value = result.interval || 3;
    });

    intervalInput.addEventListener("change", async () => {
        const interval = Number(intervalInput.value);
        await chrome.storage.local.set({ interval });
        console.log("Activity interval set to:", interval, "minutes");
    });
});
