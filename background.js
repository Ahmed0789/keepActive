// Set up an alarm to periodically wake the service worker
chrome.alarms.create("keepAlive", { delayInMinutes: 0.1, periodInMinutes: 3 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "keepAlive") {
    console.log("Service worker woken up by alarm.");
    performActivitySimulation();
  }
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "wakeUp") {
    console.log("Service worker activated by message.");
    sendResponse({ success: true });
    performActivitySimulation();
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
  
  // Update the activity simulation logic to send notifications
  function performActivitySimulation() {
    chrome.storage.local.get(["isActive"], (result) => {
      if (result.isActive) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: () => console.log("Browser activity simulated!")
            });
            sendNotification("Activity simulated successfully!");
          }
        });
      }
    });
  }
  
function keepBrowserActive() {
    // Check if simulation is enabled
    chrome.storage.local.get(["isActive"], (result) => {
        if (result.isActive) {
            console.log("Simulating activity...");
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        func: () => console.log("Browser activity simulated!")
                    });
                }
            });
        } else {
            console.log("Activity simulation is disabled.");
        }
    });
}

// Dynamically set the interval based on user preference
function startSimulation() {
    chrome.storage.local.get(["interval"], (result) => {
        const interval = (result.interval || 3) * 60000; // Convert minutes to milliseconds
        console.log(`Activity interval set to ${interval} milliseconds.`);
        setInterval(keepBrowserActive, interval);
    });
}

// Start simulation on extension load
startSimulation();
