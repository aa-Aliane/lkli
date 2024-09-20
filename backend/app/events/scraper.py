import os
import time

import pandas as pd
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait as wait
from tqdm import tqdm

# Create tmp_dir
temp_dir = "~/_tmp"
# os.makedirs(temp_dir)
os.environ["TMPDIR"] = temp_dir


# Define the base URL and categories
base_url = "https://sortir.besancon.fr/evenements/categorie/"
# categories = ["spectacle", "jeune-public", "sport", "exposetvisites"]
categories = ["spectacle", "jeune-public"]

# Set path to firefox binary
opt = webdriver.FirefoxOptions()
opt.binary_location = "/usr/bin/firefox"


# Setup geckodriver service
service = Service("/usr/local/bin/geckodriver")  # Path to your geckodriver


# Initialize the driver
driver = webdriver.Firefox(
    service=service,
    options=opt,
)


def get_event_data(category):
    url = f"{base_url}{category}/"
    response = requests.get(url)

    if response.status_code != 200:
        print(f"Failed to retrieve {category} page")
        return []

    soup = BeautifulSoup(response.content, "html.parser")
    events_div = soup.find("div", class_="cgList__events")

    if not events_div:
        print(f"No events found for category {category}")
        return []

    events = events_div.find_all("div", class_=["cgEvent", "--visible"])

    event_list = []

    for event in events:
        event_data = {}

        # Extract image
        image_tag = event.find("div", class_="cgEvent__image").find("img")
        event_data["image"] = image_tag["src"] if image_tag else None

        # Extract dates
        date_tag = event.find("div", class_="cgEvent__date")
        event_data["start_date"] = (
            date_tag.find("span", class_="tribe-event-date-start").text
            if date_tag.find("span", class_="tribe-event-date-start")
            else None
        )
        event_data["end_date"] = (
            date_tag.find("span", class_="tribe-event-date-end").text
            if date_tag.find("span", class_="tribe-event-date-end")
            else None
        )

        # Extract title
        title_tag = event.find("div", class_="cgEvent__title").find("a")
        event_data["title"] = title_tag.text if title_tag else None
        event_data["url"] = title_tag["href"] if title_tag else None

        # Extract categories
        categories_tags = event.find("div", class_="cgEvent__cats").find_all("a")
        event_data["categories"] = ", ".join([cat.text for cat in categories_tags])

        # Extract abstract
        abstract_tag = event.find("div", class_="cgEvent__abstract").find("p")
        event_data["abstract"] = abstract_tag.text if abstract_tag else None

        # Append event data to the list
        event_list.append(event_data)

    return event_list


def click_load_more(driver):
    try:
        # Try finding the element by class name first
        # more_button = WebDriverWait(driver, 10).until(
        #     EC.element_to_be_clickable((By.CLASS_NAME, "cgList__moreRow"))
        # )
        time.sleep(10)
        more_button = driver.find_element(By.CLASS_NAME, "cgList__moreBtn")
        wait(driver, 2).until(EC.element_to_be_clickable(more_button))
        more_button.click()
        return True

    except:  # Handle other potential exceptions
        return False


def get_end_expand(url):
    driver.get(url)

    load_more = click_load_more(driver)

    while load_more == True:
        click_result = click_load_more(driver)
        if not click_result:  # Check if click_result is False
            # Handle the case where clicking failed (e.g., break the loop)
            print("Clicking Load More failed, stopping loop")
            break

    events = driver.find_elements(By.CLASS_NAME, "cgEvent")

    links = []
    for event in events:
        # for each event i want to get a tag 'a' and get its link
        anchor_tag = event.find_element(By.TAG_NAME, "a")
        # Extract the href attribute containing the link URL
        link = anchor_tag.get_attribute("href")
        links.append(link)

    return links


def crawl():
    all_events = []

    for category in categories:

        events = get_event_data(category)
        print(f"Scraping category: {category} : {len(events)}")

        if events:
            all_events += events

    print(len(all_events))

    # # Print the scraped data
    # for category, events in all_events.items():
    #     print(f"\nCategory: {category}")
    #     print(events)
    #     for event in events:
    #         print(f"Title: {event.get('title')}")
    #         print(f"URL: {event.get('event_url')}")
    #         print(f"Image: {event.get('image_url')}")
    #         print(f"Date: {event.get('date')}")
    #         print(f"Categories: {event.get('categories')}")
    #         print(f"Abstract: {event.get('abstract')}\n")

    # Create a pandas DataFrame from the events list
    df = pd.DataFrame(all_events)

    # Save the DataFrame to a CSV file
    df.to_csv("events.csv", index=False)

    print("Events have been successfully saved to events.csv")


def scrap():
    data = []
    for category in tqdm(categories):
        # Navigate to the page with the events
        url = f"{base_url}{category}/"
        links = get_end_expand(url)
        for link in links:
            data.append({"link": link})

    df = pd.DataFrame(data)
    df.to_csv("links.csv")


if __name__ == "__main__":
    scrap()
