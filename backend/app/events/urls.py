"""
URL Configuration for the accounts app.
"""

from django.urls import path
from events.viewsets import categorie, comment, event, like, tag
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"events", event.ViewSet, basename="events")
router.register(r"tags", tag.ViewSet, basename="tags")
router.register(r"categories", categorie.ViewSet, basename="categories")
router.register(r"comments", comment.ViewSet, basename="comments")
router.register(r"likes", like.ViewSet, basename="likes")


urlpatterns = router.urls + [
    path("likes-by-event/", event.EventLikesView.as_view(), name="likes-by-event"),
    path(
        "comments-by-event/",
        event.EventCommentsView.as_view(),
        name="comments-by-event",
    ),
]
