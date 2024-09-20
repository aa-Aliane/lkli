"""
URL Configuration for the accounts app.
"""

from rest_framework.routers import DefaultRouter

from .views import AccountViewSet, CompanyViewSet

router = DefaultRouter()

router.register(r"accounts", AccountViewSet, basename="account")
router.register(r"companies", CompanyViewSet, basename="company")


urlpatterns = router.urls
