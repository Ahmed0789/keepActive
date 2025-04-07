import pyautogui
import time

def simulate_key_press():
    # Simulate pressing the 'shift' key
    pyautogui.keyDown('shift')  # Press 'shift'
    time.sleep(0.1)  # Hold for a short moment
    pyautogui.keyUp('shift')  # Release 'shift'

# Run the key press simulation every 30 seconds
while True:
    simulate_key_press()
    time.sleep(30)  # Adjust time interval as needed
