"""
URL Configuration for the accounts app.
"""

from rest_framework.routers import DefaultRouter

from .views import RegionViewSet

router = DefaultRouter()

router.register(r"regions", RegionViewSet, basename="regions")


urlpatterns = router.urls
