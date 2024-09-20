"event viewset"
import json
from datetime import datetime

from events.models import Comment, Event, Like
from events.pagination import EventsPagination
from events.serializers import comment, event, like
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView


class ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows events to be viewed or edited.
    """

    queryset = Event.objects.all()
    serializer_class = event.Serializer
    permission_classes = [permissions.AllowAny]
    pagination_class = EventsPagination

    def get_queryset(self):
        "override the get_queryset method to order the queryset by created_at"
        queryset = Event.objects.all().order_by("-created_at")
        return queryset

    def list(self, request, *args, **kwargs):
        "override the list method to filter the queryset based on query parameters"
        queryset = self.get_queryset()

        # Get query parameters
        region = request.query_params.get("region", None)
        categories = request.query_params.getlist("cats", None)
        tags = request.query_params.getlist("tags", None)
        datemin = request.query_params.get("datemin", None)
        datemax = request.query_params.get("datemax", None)
        timemin = request.query_params.get("timemin", None)
        timemax = request.query_params.get("timemax", None)

        # Apply filters based on the query parameters
        if region:
            queryset = queryset.filter(region=region)
        if categories:
            queryset = queryset.filter(categories__id__in=categories).distinct()
        if tags:
            queryset = queryset.filter(tags__id__in=tags).distinct()
        if datemin:
            queryset = queryset.filter(date__gte=datemin)

        if datemax:
            queryset = queryset.filter(date__lte=datemax)

        if timemin:
            queryset = queryset.filter(time__gte=timemin)

        if timemax:
            queryset = queryset.filter(time__lte=timemax)

        # Serialization
        serializer = self.get_serializer(queryset, many=True)

        # Custom response
        custom_data = {
            "count": queryset.count(),
            "results": serializer.data,
            "metadata": {
                "filters": {
                    "region": region,
                    "categories": categories,
                    "tags": tags,
                    "datemin": datemin,
                    "datemax": datemax,
                }
            },
        }

        # paginate response
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)


class EventLikesView(APIView):
    """View to get likes structured by event ID"""

    def get(self, request, *args, **kwargs):
        """get likes structured by event ID"""
        likes = Like.objects.all()
        serialized_likes = like.Serializer(likes, many=True).data

        likes_by_event = {}
        likes_count = {}
        for l in serialized_likes:
            event_id = l["event"]
            if event_id not in likes_by_event:
                likes_by_event[event_id] = []
                likes_count[event_id] = 0
            likes_by_event[event_id].append(l)
            likes_count[event_id] += 1

        return Response({"likes": likes_by_event, "count": likes_count})


class EventCommentsView(APIView):
    """View to get comments structured by event ID"""

    def get(self, request, *args, **kwargs):
        """get comments structured by event ID"""
        comments = Comment.objects.exclude(event__isnull=True)
        serialized_comments = comment.Serializer(
            comments, many=True, context={"request": request}
        ).data
        comments_by_event = {}
        comments_count = {}

        for c in serialized_comments:
            event_id = c["event"]
            if event_id not in comments_by_event:
                comments_by_event[event_id] = []
                comments_count[event_id] = 0
            comments_by_event[event_id].append(c)
            comments_count[event_id] += 1

        return Response({"comments": comments_by_event, "count": comments_count})
