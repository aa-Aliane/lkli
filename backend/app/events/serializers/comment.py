"categorie serializer"
from events.models import Comment
from rest_framework import serializers


class Serializer(serializers.ModelSerializer):
    """_summary_"""

    class Meta:
        """_meta_"""

        model = Comment
        fields = "__all__"
