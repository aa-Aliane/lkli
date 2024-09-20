"event viewset"
from events.models import Tag
from events.serializers import tag
from rest_framework import permissions, viewsets


class ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tags to be viewed or edited.
    """

    queryset = Tag.objects.all()
    serializer_class = tag.Serializer
    permission_classes = [permissions.AllowAny]
