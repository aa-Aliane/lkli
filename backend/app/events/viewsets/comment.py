"comment viewset"
from collections import defaultdict

from events.models import Comment
from events.serializers import comment
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Comments to be viewed or edited.
    """

    queryset = Comment.objects.all()
    serializer_class = comment.Serializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Set the author to the currently authenticated user
        serializer.save(author=self.request.user)

    @action(detail=False, methods=["post"])
    def by_parent_ids(self, request):
        parent_ids = request.data.get("parentIds", [])
        if not parent_ids:
            return Response({"detail": "No parent IDs provided."}, status=400)

        comments = Comment.objects.filter(comment_id__in=parent_ids)
        serializer = self.get_serializer(comments, many=True)
        grouped_comments = defaultdict(list)

        for comment in serializer.data:
            parent_id = comment["comment"]
            grouped_comments[parent_id].append(comment)

        return Response(grouped_comments)
