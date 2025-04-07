const notifier = require('node-notifier');
const path = require('path');

// Function to simulate activity by sending notifications
function simulateActivity() {
    console.log('Simulating activity...');

    notifier.notify(
        {
            title: 'System Activity',
            message: 'Your system is active. Keep going!',
            icon: path.join(__dirname, 'icon.png'), // Optional icon for notification
            sound: true, // Play a sound (optional)
        },
        function (err, response) {
            if (err) {
                console.error('Error sending notification:', err);
            } else {
                console.log('Notification sent successfully!');
                console.log('Response:', response);
            }
        }
    );
}

// Trigger the activity simulation every 1 to 2 minutes
const intervalId = setInterval(() => {
    simulateActivity();
    console.log(`Next notification in 1 minute...`);
}, 60 * 1000); // 60,000 ms = 1 minute

console.log('Activity simulation started. Notifications will be sent every minute.');
