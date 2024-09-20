"""
Serializers for the accounts app.

This module contains serializers for handling data related to user profiles,
 companies, and roles.
"""

from datetime import datetime

import rest_framework_simplejwt.exceptions as jwt_exceptions
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password
from django.core.validators import (
    EmailValidator,
    MaxLengthValidator,
    MinLengthValidator,
)
from rest_framework import exceptions, serializers, validators
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework_simplejwt.settings import api_settings

from .models import Account, Company


class AccountSerializer(serializers.ModelSerializer):
    """
    Serializer for the Account model.

    Serializes the following fields:
    - id
    - username
    - email
    - first_name
    - last_name
    - bio
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

    def __init__(self, *args, **kwargs):
        industry = kwargs.pop("context", {}).get("industry", None)
        super().__init__(*args, **kwargs)

        # Set dynamic choices for the 'roles' field based on the 'industry' value
        if industry:
            self.fields["roles"] = serializers.ChoiceField(
                choices=Account.ROLE_CHOICES.get(industry, []), required=False
            )
        else:
            self.fields.pop("roles", None)

    def get_profile_picture_url(self, obj):
        "get profile picture url"
        request = self.context.get("request")
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)

        return None

    class Meta:
        """
        Meta:
            - model: The Account model.
            - fields: The fields to be serialized.
        """

        model = Account
        exclude = ["password", "id"]


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
        Meta:
            - model: The Account model.
            - fields: All fields of the Account model.
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


class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for the Company model.

    Serializes all fields of the Company model.
    """

    class Meta:
        """
        Meta:
            - model: The Company model.
            - fields: All fields of the Company model.
        """

        model = Company
        fields = "__all__"


class JWTCoockieAccessSerializer(TokenObtainPairSerializer):
    """
    Serializer for the JWT token.

    This serializer extends the TokenObtainPairSerializer from the
    rest_framework_simplejwt package.
    """

    def validate(self, attrs):
        """
        Override validate to include the user id in the response.

        Returns:
            dict: The validated data.
        """

        data = super().validate(attrs)

        print(" >>>>>>>>>>>> data", "data", self.user.email)

        data["account_id"] = self.user.id
        data["email"] = self.user.email
        data["username"] = self.user.username
        data["first_name"] = self.user.first_name
        data["last_name"] = self.user.last_name
        data["is_staff"] = self.user.is_staff
        data["is_superuser"] = self.user.is_superuser
        data["is_active"] = self.user.is_active

        print(" >>>>>>>>>>>> data", "shit")

        update_last_login(None, self.user)

        print(" >>>>>>>>>>>> data", "data", data)

        return data


class JWTCoockieRefreshSerializer(TokenRefreshSerializer):
    """
    Serializer for the JWT refresh token.

    This serializer extends the TokenRefreshSerializer from the
    rest_framework_simplejwt package.
    """

    # get refresh from super request coockies
    refresh = None

    def validate(self, attrs):
        """
        Override validate to include the user id in the response.

        Returns:
            dict: The validated data.
        """
        attrs["refresh"] = self.context["request"].COOKIES.get(
            settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"]
        )

        if attrs["refresh"] is None:
            raise jwt_exceptions.InvalidToken(
                "Refresh token is missing from the request."
            )

        if attrs["refresh"]:
            return super().validate(attrs)

        raise jwt_exceptions.InvalidToken("Refresh token is missing from the request.")


class CurrentAccountSerializer(serializers.ModelSerializer):
    """
    Serializer for the Account model.
    """

    class Meta:
        """
        Meta:
            - model: The Account model.
            - fields: All fields of the Account model.
        """

        model = Account
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_superuser",
            "is_active",
        ]

    def validate(self, attrs):
        """
        Override validate to include the user id in the response.
        """
        account_id = self.context["request"].COOKIES.get("account_id")

        if account_id is None:
            raise jwt_exceptions.InvalidToken("Account id is missing from the request.")

        attrs["account_id"] = account_id

        return attrs


class LogoutSerializer(serializers.Serializer):
    """
    Serializer for the logout view.
    """

    def validate(self, attrs):
        """
        Override validate to include the user id in the response.
        """
        self.context["request"].COOKIES.delete("account_id")
