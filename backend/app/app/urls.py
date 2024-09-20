"""
URL Configuration
"""

from accounts.views import (
    AccountCreateView,
    CurrentAccountView,
    JWTCoockieRefreshView,
    JWTCoockieTokenView,
    LogoutApiView,
    StaffCreateView,
)
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("api/", include("accounts.urls")),
    path("api/", include("regions.urls")),
    path("api/", include("events.urls")),
    path("admin/", admin.site.urls),
    path("api/docs/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view()),
]

authurls = [
    path("auth/access/", JWTCoockieTokenView.as_view(), name="token_obtain_pair"),
    path("auth/refresh/", JWTCoockieRefreshView.as_view(), name="token_refresh"),
    path("auth/current/", CurrentAccountView.as_view(), name="current_account"),
    path("auth/register/", AccountCreateView.as_view(), name="register"),
    path("auth/staff/", StaffCreateView.as_view(), name="staff_register"),
    path("auth/logout/", LogoutApiView.as_view(), name="logout"),
]

urlpatterns += authurls

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
