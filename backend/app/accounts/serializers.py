"""
Serializers for the accounts app.

This module contains serializers for handling data related to user profiles,
 companies, and roles.
"""

from datetime import datetime

from accounts.models import Account

# import rest_framework_simplejwt.exceptions as jwt_exceptions
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password
from django.core.validators import (
    EmailValidator,
    MaxLengthValidator,
    MinLengthValidator,
)
from rest_framework import serializers, validators


class AccountSerializer(serializers.ModelSerializer):
    """
    Serializer for the Account model.
    """

    username = serializers.CharField(
        validators=[
            MaxLengthValidator(255, message="username must be at least 10 characters."),
            validators.UniqueValidator(
                queryset=Account.objects.all(),
                message="A user with that username already exists.",
            ),
        ]
    )

    email = serializers.EmailField(
        validators=[
            EmailValidator(message="Enter a valid email address."),
            validators.UniqueValidator(
                queryset=Account.objects.all(),
                message="A user with that email already exists.",
            ),
        ],
        allow_blank=True,
    )

    def get_profile_picture_url(self, obj):
        "get profile picture url"
        request = self.context.get("request")
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)

        return None

    class Meta:
        """
        Meta
        """

        model = Account
        exclude = ["password"]


class AccountCreateSerializer(AccountSerializer):
    """
    Serializer for creating an account.
    """

    password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[
            MinLengthValidator(4, message="Password must be at least 4 characters."),
            # validate_password,
        ],
    )

    class Meta:
        """
        Meta
        """

        model = Account
        fields = [
            "email",
            "password",
        ]

        extra_kwargs = {
            "username": {"required": True},
            "email": {"required": True},
            "password": {
                "required": True,
                "read_only": True,
            },
        }

    def create(self, validated_data):
        """
        Override create to hash the password.
        """
        validated_data.pop("password", None)
        account = Account.objects.create_user({**validated_data})

        account.save()

        return account


class StaffCreateSerializer(AccountCreateSerializer):
    """
    Serializer for creating a staff account.
    """

    class Meta:
        """
        Meta:
            - model: The Account model.
            - fields: All fields of the Account model.
        """

        model = Account
        fields = [
            "username",
            "password",
        ]

        extra_kwargs = {
            "username": {"required": True},
            "password": {
                "required": True,
                "read_only": True,
            },
        }

    def create(self, validated_data):
        """
        Override create to hash the password.
        """

        account = Account.objects.create_user(**validated_data)
        account.is_staff = True

        account.set_password(validated_data["password"])

        account.save()

        return account
