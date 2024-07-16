from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

RUN_CHARGING_SESSION_FOR = 60  # 1 minute


def main():
    num_sessions = 0

    try:
        num_sessions = input(
            "Enter the number of charging sessions to simulate (enter 0 for infinite loop): "
        )
        num_sessions = int(num_sessions)  # Convert input to integer

        if num_sessions == 0:
            # Setup the webdriver
            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service)
            print("Running infinite loop for charging sessions...")
            try:
                # Open the OCPP Simulator URL
                driver.get("http://localhost:3000")  # Replace with actual URL

                # Wait for the page to load
                wait = WebDriverWait(driver, 10)

                # Find and click the bolt icon to increase the simulation speed
                bolt_icon = wait.until(
                    EC.element_to_be_clickable((By.ID, "bolt-button"))
                )
                bolt_icon.click()
                while True:
                    # Find and click the start charging button
                    start_button = wait.until(
                        EC.element_to_be_clickable((By.ID, "start-charging-button"))
                    )
                    start_button.click()

                    # Find and click the start button
                    start_session_button = wait.until(
                        EC.element_to_be_clickable((By.ID, "start-button"))
                    )
                    start_session_button.click()

                    time.sleep(RUN_CHARGING_SESSION_FOR)

                    # Find and click the end charging button
                    stop_button = wait.until(
                        EC.element_to_be_clickable((By.ID, "end-charging-button"))
                    )
                    stop_button.click()

                    # Find and click the stop button
                    stop_session_button = wait.until(
                        EC.element_to_be_clickable((By.ID, "stop-button"))
                    )
                    stop_session_button.click()
            finally:
                # Close the browser
                driver.quit()

        elif num_sessions < 0:
            print("Exiting program. Negative value entered.")

        else:
            # Setup the webdriver
            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service)
            print(f"Simulating {num_sessions} charging sessions...")
            try:
                # Open the OCPP Simulator URL
                driver.get("http://localhost:3000")  # Replace with actual URL

                # Wait for the page to load
                wait = WebDriverWait(driver, 10)

                # Find and click the bolt icon to increase the simulation speed
                bolt_icon = wait.until(
                    EC.element_to_be_clickable((By.ID, "bolt-button"))
                )
                bolt_icon.click()

                # Run the procedure all day without any pause
                for session in range(1, num_sessions + 1):
                    print(f"Running session {session}...")
                    # Find and click the start charging button
                    start_button = wait.until(
                        EC.element_to_be_clickable((By.ID, "start-charging-button"))
                    )
                    start_button.click()

                    # Find and click the start button
                    start_session_button = wait.until(
                        EC.element_to_be_clickable((By.ID, "start-button"))
                    )
                    start_session_button.click()

                    # Wait for 5 minutes
                    time.sleep(RUN_CHARGING_SESSION_FOR)

                    # Find and click the end charging button
                    stop_button = wait.until(
                        EC.element_to_be_clickable((By.ID, "end-charging-button"))
                    )
                    stop_button.click()

                    # Find and click the stop button
                    stop_session_button = wait.until(
                        EC.element_to_be_clickable((By.ID, "stop-button"))
                    )
                    stop_session_button.click()

            finally:
                # Close the browser
                driver.quit()

    except ValueError:
        print("Invalid input. Please enter a valid number.")


if __name__ == "__main__":
    main()
