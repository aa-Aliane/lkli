from collections import OrderedDict

from django.conf import settings
from django.utils.translation import gettext_lazy as _
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from oauth2_provider.models import get_access_token_model
from oauth2_provider.oauth2_backends import get_oauthlib_core
from rest_framework import exceptions


class OAuth2CookieAuthentication(OAuth2Authentication):
    def authenticate(self, request):
        # Extract the OAuth2 token from the cookies
        token = request.COOKIES.get("access")
        if not token:
            return None

        # Create a fake request object with the Authorization header
        fake_request = self._create_fake_request(request, token)

        # Validate the token
        valid, oauthlib_request = self._validate_token(fake_request)
        if not valid:
            msg = _("Invalid or expired token.")
            raise exceptions.AuthenticationFailed(msg)

        # Retrieve the user associated with the token
        user = self._get_user(oauthlib_request)
        if not user:
            msg = _("No user associated with this token.")
            raise exceptions.AuthenticationFailed(msg)

        # Return the user and the token
        return (user, oauthlib_request.access_token)

    def _create_fake_request(self, request, token):
        # Create a new request object with the Authorization header
        request.META["HTTP_AUTHORIZATION"] = f"Bearer {token}"
        return request

    def _validate_token(self, request):
        # Validate the token using oauthlib_core
        oauthlib_core = get_oauthlib_core()
        valid, r = oauthlib_core.verify_request(request, scopes=[])
        return valid, r

    def _get_user(self, oauthlib_request):
        # Retrieve the user associated with the validated token
        AccessToken = get_access_token_model()
        try:
            access_token = AccessToken.objects.get(token=oauthlib_request.access_token)
            return access_token.user
        except AccessToken.DoesNotExist:
            return None
