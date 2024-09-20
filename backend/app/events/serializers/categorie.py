"categorie serializer"
from events.models import Categorie
from rest_framework import serializers


class Serializer(serializers.ModelSerializer):
    """_summary_"""

    class Meta:
        """_meta_"""

        model = Categorie
        fields = "__all__"
