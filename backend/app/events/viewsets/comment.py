"event viewset"
from events.models import Comment
from events.serializers import comment
from rest_framework import permissions, viewsets


class ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Comments to be viewed or edited.
    """

    queryset = Comment.objects.all()
    serializer_class = comment.Serializer
    permission_classes = [permissions.AllowAny]
