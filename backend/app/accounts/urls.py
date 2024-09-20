"""
URL Configuration for the accounts app.
"""

from rest_framework.routers import DefaultRouter

from .views import AccountViewSet

router = DefaultRouter()

router.register(r"accounts", AccountViewSet, basename="account")


urlpatterns = router.urls
