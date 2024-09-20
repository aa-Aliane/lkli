"""
Views for the accounts app.

This module defines viewsets for handling user profiles within the accounts app.
"""

import pprint
from datetime import datetime

from django.conf import settings
from rest_framework import permissions, status, viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import Account, Company
from .permissions import OnlyAdmin
from .schema import account_list_docs
from .serializers import (
    AccountCreateSerializer,
    AccountSerializer,
    CompanySerializer,
    CurrentAccountSerializer,
    JWTCoockieAccessSerializer,
    JWTCoockieRefreshSerializer,
    StaffCreateSerializer,
)

pp = pprint.PrettyPrinter(indent=4)


class CompanyViewSet(viewsets.ModelViewSet):
    """
    Viewset for the Company model.

    Provides CRUD operations for user profiles.
    """

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permissions_classes = [permissions.IsAuthenticated]


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
         List accounts based on optional filters.

         Retrieve a list of accounts based on the provided optional filters.

         Parameters:
         - `request` (HttpRequest): The HTTP request object.
         - `username` (str, optional): Filter accounts by username.
         - `job_title` (str, optional): Filter accounts by job title.
         - `role` (str, optional): Filter accounts by role.
         - `company` (int, optional): Filter accounts by company ID.

         Returns:
         HttpResponse: A JSON response containing the list of accounts matching the
             specified filters.

         Example: `GET /accounts/?username=john_doe&role=developer`


        Raises:
         - `200 OK`: Successful retrieval of the account list.
         - `400 Bad Request`: If the request is malformed or missing required
           parameters.
         - `403 Forbidden`: If the user does not have permission to access the resource.
         - `404 Not Found`: If the requested resource is not found.
         - `500 Internal Server Error`: If there is a server-side error.

         `Note`: Additional error details may be provided in the response body for
           certain error codes.
        """
        username = request.data.get("username")
        job_title = request.data.get("job_title")
        role = request.data.get("role")
        company = request.data.get("company")

        if username and request.user.is_authenticated:
            self.queryset = self.queryset.filter(username=username)
        if job_title:
            self.queryset = self.queryset.filter(job_title=job_title)
        if role:
            self.queryset = self.queryset.filter(role=role)
        if company:
            self.queryset = self.queryset.filter(company=company)

        serializer = AccountSerializer(self.queryset, many=True)

        return Response(serializer.data)

    def get_serializer_context(self):
        """
        Override get_serializer_context to include 'industry' in the serializer context.

        Returns:
            dict: The serializer context.
        """
        context = super().get_serializer_context()

        if self.action == "retreive":
            # Fetch the related Company to access its 'industry'
            company = self.get_object().company
            industry = company.industry if company else None

            if industry:
                context["industry"] = industry

        return context


class CurrentAccountView(APIView):
    """
    API endpoint that allows users to be registered.
    """

    queryset = Account.objects.all()
    serializer_class = CurrentAccountSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        """
        Retrieve the current user's account.
        """

        return Response(CurrentAccountSerializer(request.user).data)


class AccountCreateView(CreateAPIView):
    """
    API endpoint that allows users to be registered.
    """

    queryset = Account.objects.all()
    serializer_class = AccountCreateSerializer
    permission_classes = [permissions.AllowAny]


class StaffCreateView(CreateAPIView):
    """
    API endpoint that allows users to be registered.
    """

    queryset = Account.objects.all()
    permission_classes = [permissions.IsAuthenticated, OnlyAdmin]
    serializer_class = StaffCreateSerializer


class JWTSetCoockieMixin:
    """
    Mixin that provides JWT authentication by setting a cookie.
    """

    def finalize_response(self, request, response, *args, **kwargs):
        """
        Override finalize_response to set the JWT cookie.

        Returns:
            HttpResponse: The HTTP response.
        """
        response = super().finalize_response(request, response, *args, **kwargs)

        access = response.data.get("access")
        refresh = response.data.get("refresh")

        account_id = response.data.get("account_id")

        if access:
            response.set_cookie(
                settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"],
                access,
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds(),
                httponly=True,
                samesite=settings.SIMPLE_JWT["SAME_SITE"],
            )
            response.set_cookie(
                "account_id",
                account_id,
                max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds(),
                httponly=True,
                samesite=settings.SIMPLE_JWT["SAME_SITE"],
            )
        if refresh:
            response.set_cookie(
                settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"],
                refresh,
                max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds(),
                httponly=True,
                samesite=settings.SIMPLE_JWT["SAME_SITE"],
            )

        if "access" in response.data:
            del response.data["access"]
        if "refresh" in response.data:
            del response.data["refresh"]

        response.data["account_id"] = account_id

        return response


class JWTCoockieTokenView(JWTSetCoockieMixin, TokenObtainPairView):
    """
    View to refresh a JWT token.
    """

    serializer_class = JWTCoockieAccessSerializer


class JWTCoockieRefreshView(JWTSetCoockieMixin, TokenRefreshView):
    """
    View to refresh a JWT token.
    """

    serializer_class = JWTCoockieRefreshSerializer


class LogoutApiView(APIView):
    """
    API endpoint that allows users to be logged out.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie(settings.SIMPLE_JWT["ACCESS_TOKEN_NAME"])
        response.delete_cookie(settings.SIMPLE_JWT["REFRESH_TOKEN_NAME"])
        response.delete_cookie("account_id")

        return response
