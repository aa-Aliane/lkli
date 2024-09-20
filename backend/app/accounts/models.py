"""
Models for the accounts app.

This module defines the data models used in the accounts app.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models


class Company(models.Model):
    """
    Model representing a company.

    Fields:
    - name: The name of the company.
    - industry: The industry or sector the company operates in.
    - headquarters: The location of the company's headquarters.
    - founded_date: The date when the company was founded.
    """

    INDUSTRY_CHOICES = [
        ("IT", "Information Technology"),
        ("Healthcare", "Healthcare"),
        ("Finance", "Finance"),
        ("Engineering", "Engineering"),
        # Add more industries as needed
    ]

    name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255, blank=True, choices=INDUSTRY_CHOICES)
    headquarters = models.CharField(max_length=255, blank=True)
    founded_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Account(AbstractUser):
    """
    Custom user model representing an account.

    Fields:
    - bio: A text field for the user's biography.
    - profile_picture: An image field for the user's profile picture.
    - phone_number: The user's phone number.
    - address: The user's physical address.
    - birth_date: The user's date of birth.
    - gender: The user's gender.
    - social_media_links: URLs to the user's social media profiles.
    - company: The company the user is associated with.
    - roles: The roles or positions of the user within the organization
      (many-to-many relationship).
    - job_title: The user's job title or role-specific title.
    - skills: A list of skills the user possesses.
    - interests: The user's interests or hobbies.
    - is_subscribed: Indicates whether the user is subscribed to newsletters or updates.
    - date_of_joining: The date when the user joined the company.
    """

    ROLE_CHOICES = {
        "IT": [
            ("Software Developer", "Software Developer"),
            ("System Administrator", "System Administrator"),
            ("Network Engineer", "Network Engineer"),
            # Add more IT roles as needed
        ],
        "Healthcare": [
            ("Doctor", "Doctor"),
            ("Nurse", "Nurse"),
            ("Pharmacist", "Pharmacist"),
            # Add more healthcare roles as needed
        ],
        "Finance": [
            ("Accountant", "Accountant"),
            ("Financial Analyst", "Financial Analyst"),
            ("Auditor", "Auditor"),
            # Add more finance roles as needed
        ],
        "Engineering": [
            ("Civil Engineer", "Civil Engineer"),
            ("Mechanical Engineer", "Mechanical Engineer"),
            ("Electrical Engineer", "Electrical Engineer"),
            # Add more engineering roles as needed
        ],
        # Add more industries and roles as needed
    }

    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/", null=True, blank=True
    )
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")],
        blank=True,
    )
    social_media_links = models.TextField(blank=True)
    company = models.ForeignKey(
        Company, on_delete=models.SET_NULL, null=True, blank=True
    )
    roles = models.CharField(max_length=255, blank=True, choices=ROLE_CHOICES)
    job_title = models.CharField(max_length=255, blank=True)
    skills = models.TextField(blank=True)
    interests = models.TextField(blank=True)
    is_subscribed = models.BooleanField(default=False)
    date_of_joining = models.DateField(null=True, blank=True)

    USERNAME_FIELD = "username"

    def __str__(self):
        return self.username
