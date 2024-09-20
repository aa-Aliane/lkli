import os
from datetime import datetime, timedelta

import pandas as pd
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm


def parse_french_date(date_string):
    months = {
        "janvier": 1,
        "février": 2,
        "mars": 3,
        "avril": 4,
        "mai": 5,
        "juin": 6,
        "juillet": 7,
        "août": 8,
        "septembre": 9,
        "octobre": 10,
        "novembre": 11,
        "décembre": 12,
    }

    parts = date_string.split()
    day = int(parts[1])  # e.g., "dimanche 28 avril" -> 28
    month = months[parts[2]]  # e.g., "dimanche 28 avril" -> 4 (avril)
    year = datetime.now().year  # Assuming the event is in the current year

    return datetime(year, month, day)


def get_data(url):
    try:
        # Fetch the page content
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Parse the HTML content
        soup = BeautifulSoup(response.text, "html.parser")

        # Find the document content
        document_content = soup.find("div", class_="cgEventSingle")

        if not document_content:
            print(f"Warning: No event content found for {url}")
            return None

        # Extract event title
        event_title = document_content.h1.text.strip() if document_content.h1 else "N/A"

        # Extract and parse event dates
        event_start_str = (
            document_content.find("span", class_="tribe-event-date-start").text.strip()
            if document_content.find("span", class_="tribe-event-date-start")
            else "N/A"
        )
        event_end_str = (
            document_content.find("span", class_="tribe-event-date-end").text.strip()
            if document_content.find("span", class_="tribe-event-date-end")
            else "N/A"
        )

        event_start = (
            parse_french_date(event_start_str) if event_start_str != "N/A" else None
        )
        event_end = parse_french_date(event_end_str) if event_end_str != "N/A" else None

        # Convert to ISO 8601 format for Django
        event_start_iso = (
            event_start.strftime("%Y-%m-%dT00:00:00+02:00") if event_start else "N/A"
        )
        event_end_iso = (
            (event_end + timedelta(days=1, seconds=-1)).strftime(
                "%Y-%m-%dT23:59:59+02:00"
            )
            if event_end
            else "N/A"
        )

        # Extract event description
        description_div = document_content.find(
            "div", class_="cgEventSingle__contentCol", attrs={"class": "col1"}
        )
        event_description = (
            description_div.p.text.strip()
            if description_div and description_div.p
            else "N/A"
        )

        # Extract event location
        event_location = (
            document_content.find("dd", class_="tribe-venue").text.strip()
            if document_content.find("dd", class_="tribe-venue")
            else "N/A"
        )
        event_address = (
            document_content.find("span", class_="tribe-street-address").text.strip()
            if document_content.find("span", class_="tribe-street-address")
            else "N/A"
        )
        event_city = (
            document_content.find("span", class_="tribe-locality").text.strip()
            if document_content.find("span", class_="tribe-locality")
            else "N/A"
        )
        event_postal_code = (
            document_content.find("span", class_="tribe-postal-code").text.strip()
            if document_content.find("span", class_="tribe-postal-code")
            else "N/A"
        )
        event_country = (
            document_content.find("span", class_="tribe-country-name").text.strip()
            if document_content.find("span", class_="tribe-country-name")
            else "N/A"
        )

        # Extract event organizer
        event_organizer = (
            document_content.find("dd", class_="tribe-organizer").text.strip()
            if document_content.find("dd", class_="tribe-organizer")
            else "N/A"
        )

        # Extract event website
        website_div = document_content.find("div", class_="cgEventSingle__site")
        event_website = (
            website_div.a["href"] if website_div and website_div.a else "N/A"
        )

        # Extract event categories
        categories_div = document_content.find("div", class_="cgEventSingle__cats")
        event_categories = (
            [li.a.text.strip() for li in categories_div.ul.find_all("li")]
            if categories_div and categories_div.ul
            else []
        )

        # Extract event image
        image_div = document_content.find("div", class_="cgEventSingle__image")
        event_image = image_div.img["src"] if image_div and image_div.img else "N/A"

        # Return the extracted data as a dictionary
        return {
            "Title": event_title,
            "Start Date": event_start_iso,
            "End Date": event_end_iso,
            "Description": event_description,
            "Venue": event_location,
            "Address": event_address,
            "City": event_city,
            "Postal Code": event_postal_code,
            "Country": event_country,
            "Organizer": event_organizer,
            "Website": event_website,
            "Categories": ", ".join(event_categories),
            "Image URL": event_image,
            "Source URL": url,
        }

    except requests.exceptions.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None
    except AttributeError as e:
        print(f"Error parsing data from {url}: {e}")
        return None


def crawl():
    urls = pd.read_csv("events/links.csv")

    urls = urls["link"].tolist()

    # Now you can use this list with your get_data function

    data = []
    for url in tqdm(urls):
        event_data = get_data(url)
        if event_data:
            data.append(event_data)

    # Convert the data to a pandas DataFrame
    df_events = pd.DataFrame(data)

    # Save the DataFrame to a CSV file
    df_events.to_csv("events_data.csv", index=False, encoding="utf-8-sig")

    print(f"Data saved to events_data.csv")
