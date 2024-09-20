"like serializer"
from accounts.models import Account
from events.models import Event, Like
from rest_framework import serializers


class Serializer(serializers.ModelSerializer):
    """Serializer for Like model with account ID"""

    author = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        """_meta_"""

        model = Like
        fields = "__all__"

    # def create(self, validated_data):
    #     event = validated_data.pop("event")
    #     account = validated_data.pop("account")

    #     # Create the Like instance

    #     return Like.objects.get_or_create(
    #         event=event, account=account, **validated_data
    #     )
