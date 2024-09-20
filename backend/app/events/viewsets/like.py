"like viewset"
from events.models import Like
from events.serializers import like
from rest_framework import permissions, viewsets


class ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Likes to be viewed or edited.
    """

    queryset = Like.objects.all()
    serializer_class = like.Serializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Set the author to the currently authenticated user
        serializer.save(author=self.request.user)
