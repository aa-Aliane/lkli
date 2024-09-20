from typing import Any

from django.conf import settings
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http.request import HttpRequest
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Account


class JWTCoockieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        """
        Override authenticate to set the JWT cookie.

        Returns:
            tuple: The authenticated user and the token.
        """
        raw_token = (
            request.COOKIES.get(settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"])
            or request.COOKIES.get(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])
            or None
        )

        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token

    # logout
    def logout(self, request):
        """
        Override logout to clear the JWT cookie.

        Returns:
            HttpResponse: The HTTP response.
        """
        response = super().logout(request)

        response.delete_cookie(settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"])
        response.delete_cookie(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])

        return response


class UsernameOrEmailBackend(ModelBackend):
    """
    Override the default authentication backend to allow authentication using
    either the username or email.
    """

    def to_internal_value(self, username: str) -> str:
        """
        Override to_internal_value to allow authentication using either the
        username or email.
        """
        if "@" in username:
            self.username_field = "email"
            return username
        else:
            self.username_field = "username"
            return username

    def authenticate(
        self,
        request: HttpRequest,
        username: str | None = None,
        password: str | None = None,
        **kwargs: Any
    ) -> AbstractBaseUser | None:

        if username is None:
            identifier = kwargs.get(self.username_field)
        else:
            identifier = username

        try:
            if "@" in identifier:
                user = Account.objects.get(email=identifier)
            else:
                user = Account.objects.get(username=identifier)

        except Account.DoesNotExist:
            return None

        if user.check_password(password):
            return user

        return None
