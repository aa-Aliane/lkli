"""
URL Configuration
"""

from accounts.views import LogoutApiView, SocialAccountGetter
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
    path("auth/", include("drf_social_oauth2.urls", namespace="drf")),
]

custom_auth_urls = [
    path("auth/convert-token2/", SocialAccountGetter.as_view(), name="convert_token"),
    path("auth/logout/", LogoutApiView.as_view(), name="logout"),
]

urlpatterns += authurls + custom_auth_urls

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
