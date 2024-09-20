"""
Views for the accounts app.

This module defines viewsets for handling user profiles within the accounts app.
"""

import pprint
from datetime import datetime

from django.conf import settings
from django.db.utils import IntegrityError
from django.http import JsonResponse
from drf_social_oauth2.views import ConvertTokenView
from oauth2_provider.models import AccessToken
from rest_framework import permissions, status, viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Account
from .permissions import OnlyAdmin
from .schema import account_list_docs
from .serializers import AccountCreateSerializer, AccountSerializer

pp = pprint.PrettyPrinter(indent=4)


class AccountViewSet(viewsets.ModelViewSet):
    """
    Viewset for the Account model.

    Provides CRUD operations for user profiles.

    Dynamic choices for 'roles' field based on the 'industry' value.
    """

    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    @account_list_docs
    def list(self, request):
        """
        accounts list
        """
        username = request.data.get("username")

        if username and request.user.is_authenticated:
            self.queryset = self.queryset.filter(username=username)

        serializer = AccountSerializer(self.queryset, many=True)

        return Response(serializer.data)


class AccountCreateView(CreateAPIView):
    """
    API endpoint that allows users to be registered.
    """

    queryset = Account.objects.all()
    serializer_class = AccountCreateSerializer
    permission_classes = [permissions.AllowAny]


class SocialAccountGetter(ConvertTokenView):
    "Social account getter class"

    def post(self, request, *args, **kwargs):
        "post"
        # First, call the superclass method to get the token response
        response = super().post(request, *args, **kwargs)
        pp.pprint(f"accessToken{request.data}")
        # Check if the response status code is 200 (OK)
        if response.status_code == 200:
            # Parse the JSON response to get the access token
            response_data = response.data
            access_token = response_data.get("access_token")
            refresh_token = response_data.get("refresh_token")

            # setting access cookie
            if access_token:

                try:
                    # Use the access token to get the user information
                    token = AccessToken.objects.get(token=access_token)
                    user_id = token.user.id

                    response.set_cookie(
                        settings.SOCIAL_OAUTH_TOKENS["ACCESS_TOKEN_NAME"],
                        access_token,
                        samesite=settings.SOCIAL_OAUTH_TOKENS["SAME_SITE"],
                        httponly=True,
                    )

                    # Add the user ID to the response
                    response_data["user_id"] = user_id
                except AccessToken.DoesNotExist:
                    response_data["error"] = ["Invalid access token"]
            else:
                response_data["error"] = "Access token not found in the response"

            # setting refresh cookie
            if refresh_token:

                response.set_cookie(
                    settings.SOCIAL_OAUTH_TOKENS["REFRESH_TOKEN_NAME"],
                    refresh_token,
                    samesite=settings.SOCIAL_OAUTH_TOKENS["SAME_SITE"],
                    httponly=True,
                )

            else:
                response_data["error"] = "Refresh token not found in the response"

            if "access_token" in response.data:
                del response.data["access_token"]

            if "refresh_token" in response.data:
                del response.data["refresh_token"]

        return response


class LogoutApiView(APIView):
    """
    API endpoint that allows users to be logged out.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie(settings.SOCIAL_OAUTH_TOKENS["ACCESS_TOKEN_NAME"])
        response.delete_cookie(settings.SOCIAL_OAUTH_TOKENS["REFRESH_TOKEN_NAME"])

        return response
