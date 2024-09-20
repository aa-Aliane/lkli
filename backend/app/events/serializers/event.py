"event serializer"
from accounts.serializers import AccountSerializer
from events.models import Event
from regions.serializers import RegionSerializer
from rest_framework import serializers

from . import categorie, tag


class Serializer(serializers.ModelSerializer):
    """_summary_"""

    cat = categorie.Serializer(read_only=True)
    tags = tag.Serializer(read_only=True, many=True)
    creator = AccountSerializer(read_only=True)
    artist = AccountSerializer(read_only=True)
    region = RegionSerializer(read_only=True)

    class Meta:
        """_meta_"""

        model = Event
        fields = "__all__"
