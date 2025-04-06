// Setup alarm to periodically wake the service worker
chrome.alarms.create("keepAlive", { delayInMinutes: 0.1, periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "keepAlive") {
    console.log("⏰ Service worker woken up by alarm.");
    simulateActivity();
  }
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "wakeUp") {
    console.log("🔔 Service worker activated by message.");
    simulateActivity();
    sendResponse({ success: true });
  }
});

function sendNotification(message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "Keep Active",
    message: message
  });
}

// Unified function to simulate activity
function simulateActivity() {
  chrome.storage.local.get(["isActive"], (result) => {
    if (result.isActive) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].id !== chrome.tabs.TAB_ID_NONE) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => console.log("📡 Browser activity simulated!")
          });
         
        }
      });
      addToLog('Simulated activity');
    } else {
      console.log("⛔ Activity simulation is disabled.");
      addToLog('Disabled simulating activity');
    }
  });
}

// Track if interval is already running
let simulationIntervalId = null;

// Dynamically set the interval based on user preference
function startSimulation() {
  chrome.storage.local.get(["interval", "isActive"], (result) => {
    const interval = (result.interval || 3) * 60000; // convert to milliseconds

    // Clear existing interval if any
    if (simulationIntervalId) {
      clearInterval(simulationIntervalId);
    }

    if (result.isActive) {
      simulationIntervalId = setInterval(simulateActivity, interval);
      console.log(`🕒 Activity simulation interval set to every ${interval / 60000} minute(s).`);
    } else {
      console.log("🛑 Simulation not started: isActive is false.");
    }
  });
}

// Re-fetch settings and re-init interval when storage changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && (changes.interval || changes.isActive)) {
    console.log("🔄 Storage updated, restarting simulation...");
    startSimulation();
  }
});

function addToLog(message) {
  chrome.storage.local.get('activityLog', ({ activityLog = [] }) => {
    const entry = `[${new Date().toLocaleTimeString()}] ${message}`;
    activityLog.push(entry);
    chrome.storage.local.set({ activityLog });
    chrome.runtime.sendMessage({ type: 'log-update', data: activityLog });
  });
}

// Start simulation on service worker load
startSimulation();
