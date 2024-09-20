"tag serializer"
from events.models import Tag
from rest_framework import serializers


class Serializer(serializers.ModelSerializer):
    """_summary_"""

    class Meta:
        """_meta_"""

        model = Tag
        fields = "__all__"
