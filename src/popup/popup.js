document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-active');
    const intervalInput = document.getElementById('interval');
    const logList = document.getElementById('log');
    const clearLogBtn = document.getElementById('clear-log');
    const statusIndicator = document.getElementById('status-indicator');


    // Restore state
    chrome.storage.local.get(['isActive', 'interval', 'activityLog'], (data) => {
        toggle.checked = !!data.isActive;
        statusIndicator.style.display = toggle.checked ? 'inline-block' : 'none';
        intervalInput.value = data.interval || 3;
        updateLogDisplay(data.activityLog || []);
    });

    // Save toggle
    toggle.addEventListener('change', () => {
        chrome.storage.local.set({ isActive: toggle.checked });
        statusIndicator.style.display = toggle.checked ? 'inline-block' : 'none';

    });

    // Save interval
    intervalInput.addEventListener('input', () => {
        const val = Math.max(1, parseInt(intervalInput.value, 10));
        intervalInput.value = val;
        chrome.storage.local.set({ interval: val });
    });

    // Clear log
    clearLogBtn.addEventListener('click', () => {
        chrome.storage.local.set({ activityLog: [] });
        updateLogDisplay([]);
    });

    // Listen for new log entries
    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'log-update') {
            updateLogDisplay(message.data);
        }
    });

    function updateLogDisplay(logs) {
        logList.innerHTML = '';
        logs.slice(-50).forEach((entry) => {
            const li = document.createElement('li');
            li.textContent = entry;
            logList.appendChild(li);
        });
        logList.scrollTop = logList.scrollHeight;
    }

    chrome.runtime.sendMessage({ type: "wakeUp" }, (response) => {
        if (chrome.runtime.lastError) {
            console.warn("Background service worker not available:", chrome.runtime.lastError.message);
        } else if (response?.success) {
            console.log("Wake-up message successfully received by background.");
        }
    });
});
