"event viewset"
from events.models import Categorie
from events.serializers import categorie
from rest_framework import permissions, viewsets


class ViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """

    queryset = Categorie.objects.all()
    serializer_class = categorie.Serializer
    permission_classes = [permissions.AllowAny]
