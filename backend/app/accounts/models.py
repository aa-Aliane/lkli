"""
Models for the accounts app.

This module defines the data models used in the accounts app.
"""

from django.contrib.auth.models import AbstractUser
from django.db import models


class Account(AbstractUser):
    """
    Custom user model representing an account.
    """

    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/",
        null=True,
        blank=True,
        default="profile_pictures/default.png",
    )
    picture = models.CharField(max_length=500)
    phone_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")],
        blank=True,
    )
    social_media_links = models.TextField(blank=True)
    job_title = models.CharField(max_length=255, blank=True)
    skills = models.TextField(blank=True)
    interests = models.TextField(blank=True)
    is_subscribed = models.BooleanField(default=False)
    date_of_joining = models.DateField(null=True, blank=True)

    USERNAME_FIELD = "username"

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.username
