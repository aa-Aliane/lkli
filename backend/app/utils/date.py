# utils/date.py

from datetime import datetime

from django.utils.timesince import timesince


def extract_date_time(iso_string):
    """
    Extracts the date and time from an ISO 8601 formatted string.

    Parameters:
    iso_string (str): The ISO 8601 formatted string.

    Returns:
    tuple: A tuple containing the date and time as strings.
    """
    # Parse the ISO 8601 string to a datetime object
    dt = datetime.fromisoformat(iso_string)

    # Extract the date and time
    date = dt.date().isoformat()  # returns 'YYYY-MM-DD'
    time = dt.time().isoformat()  # returns 'HH:MM:SS'

    return date, time


def significant_time_since(date):
    now = datetime.now()
    # Get the timesince string
    time_since_str = timesince(date, now)
    # Split the string to get the most significant unit
    return time_since_str.split(", ")[0]
