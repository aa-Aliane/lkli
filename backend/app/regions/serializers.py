from rest_framework import serializers

from .models import Region


class RegionSerializer(serializers.ModelSerializer):
    """
    Region serializer
    """

    class Meta:
        """meta"""

        model = Region
        fields = "__all__"
