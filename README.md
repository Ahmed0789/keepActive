# Keep Active Chrome Extension

## Overview
The **Keep Active** Chrome Extension is designed to simulate browser activity periodically, ensuring your status remains active on platforms like Microsoft Teams and other activity-monitoring tools. This lightweight and customizable extension is perfect for those who need to maintain an active presence in the browser.

# Ignore scripts/ folder if your here only for the Chrome extension
---

## Features
- **Activity Simulation:** Automatically simulates browser activity every few minutes.
- **Customizable Interval:** Set your preferred activity interval (default is 3 minutes).
- **On/Off Control:** Use the slider toggle to enable or disable simulation as needed.
- **State Persistence:** The toggle retains its state even when the popup is closed and reopened.
- **Adaptive Theme:** Matches Chrome's light or dark mode for seamless aesthetics.
- **Activity Log:** Tracks and displays a history of simulation actions.

---

## How It Works
1. **Simulates Activity:**
   - Periodically sends an activity signal to the active browser tab using Chrome's APIs.
   - Refreshes status to prevent idle detection by browser-based tools.

2. **Control Options:**
   - Toggle simulation on/off via the popup interface.
   - Set a custom activity interval in minutes.

3. **User-Friendly Interface:**
   - Styled with modern design elements, including a slider toggle and adaptive theming.

---

## Installation
1. Clone or download the extension files to your local system.
2. Ensure `icon.png` is in the root folder.
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" (toggle in the top-right corner).
5. Click "Load unpacked" and select the extension folder.

---

## File Structure
|-- Keep Active/ |-- manifest.json |-- popup.html |-- popup.js |-- popup.css |-- background.js |-- icon.png

---

## Example Usage
1. Open the extension popup by clicking on the Keep Active icon.
2. Toggle the slider to enable/disable activity simulation.
3. Adjust the activity interval in minutes, as needed.
4. Monitor the activity log to track simulation actions.

---

## Contributing
Feel free to fork this repository and add new features or fix issues. Suggestions are welcome!

---

## Disclaimer
This extension is intended for legitimate use only. Please ensure compliance with your organization's policies before use.