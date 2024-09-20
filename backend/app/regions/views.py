from django.shortcuts import render
from rest_framework import permissions, viewsets

from .models import Region
from .serializers import RegionSerializer


class RegionViewSet(viewsets.ModelViewSet):
    """
    Region viewset
    """

    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    permission_classes = [permissions.AllowAny]
