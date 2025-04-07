const { exec } = require('child_process');

// Run PowerShell command to prevent sleep
function preventSleep() {
    console.log('Attempting to prevent system sleep...');

    exec('powercfg -change standby-timeout-ac 0', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error executing command: ${err.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log('Successfully disabled sleep mode on AC power.');
        console.log('Power configuration output:', stdout);
    });
}

// Prevent sleep every 2 minutes
const intervalId = setInterval(() => {
    preventSleep();
    console.log('Next sleep prevention in 2 minutes...');
}, 120 * 1000); // 120,000 ms = 2 minutes

console.log('System sleep prevention started. Sleep mode will be disabled every 2 minutes.');
