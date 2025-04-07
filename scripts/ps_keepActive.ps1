# PowerShell script to simulate keypress and prevent system from locking

# Function to simulate a key press
function Simulate-KeyPress {
    Add-Type -TypeDefinition @"
        using System;
        using System.Runtime.InteropServices;

        public class Keyboard {
            [DllImport("user32.dll")]
            public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, uint dwExtraInfo);
        }
"@

    # Constants for "Shift" key press
    $VK_SHIFT = 0x10
    $KEYEVENTF_KEYDOWN = 0x0000
    $KEYEVENTF_KEYUP = 0x0002

    # Simulate pressing and releasing the "Shift" key
    [Keyboard]::keybd_event($VK_SHIFT, 0, $KEYEVENTF_KEYDOWN, 0)
    Start-Sleep -Milliseconds 100
    [Keyboard]::keybd_event($VK_SHIFT, 0, $KEYEVENTF_KEYUP, 0)
}

# Run the key press simulation every 30 seconds
while ($true) {
    Simulate-KeyPress
    Start-Sleep -Seconds 30  # Adjust time interval as needed
}
