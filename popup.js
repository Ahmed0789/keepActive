document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle-active");
    const intervalInput = document.getElementById("interval");

    // Load the current state from localStorage
    const isActive = localStorage.getItem("isActive") === "true"; // localStorage stores strings
    toggle.checked = isActive;

    // Load the interval from localStorage or use default value
    const interval = localStorage.getItem("interval") || 3;
    intervalInput.value = interval;

    // Save the state when the toggle is changed
    toggle.addEventListener("change", () => {
        const isActive = toggle.checked;
        localStorage.setItem("isActive", isActive.toString()); // Save as a string
        console.log("Activity simulation is now:", isActive ? "Enabled" : "Disabled");
    });

    // Save the interval when it's changed
    intervalInput.addEventListener("change", () => {
        const interval = Number(intervalInput.value);
        localStorage.setItem("interval", interval.toString()); // Save as a string
        console.log("Activity interval set to:", interval, "minutes");
    });
});
