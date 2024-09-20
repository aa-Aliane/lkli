"""
URL Configuration for the accounts app.
"""

from events.viewsets import categorie, comment, event, tag
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"events", event.ViewSet, basename="events")
router.register(r"tags", tag.ViewSet, basename="tags")
router.register(r"categories", categorie.ViewSet, basename="categories")
router.register(r"comments", comment.ViewSet, basename="comments")


urlpatterns = router.urls
