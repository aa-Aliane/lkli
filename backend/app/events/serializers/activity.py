"comment serializer"
from events.models import Activity
from rest_framework import serializers
from utils.date import significant_time_since


class Serializer(serializers.ModelSerializer):
    """_summary_"""

    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ["date", "time_ago"]

    def get_time_ago(self, obj):
        return significant_time_since(obj.date)
