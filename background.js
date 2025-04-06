function keepBrowserActive() {
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

function sendNotification(message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Keep Active',
        message: message
    });
}

// Run the function every 3 minutes
setInterval(keepBrowserActive, 180000);

console.log("Background script running...");
