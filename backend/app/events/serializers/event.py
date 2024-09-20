from accounts.serializers import AccountSerializer
from events.models import Comment, Event, Like
from regions.serializers import RegionSerializer
from rest_framework import serializers

from . import categorie, comment, tag


class Serializer(serializers.ModelSerializer):
    """Event serializer with custom likes serialization"""

    cat = categorie.Serializer(read_only=True)
    tags = tag.Serializer(read_only=True, many=True)
    likes = serializers.SerializerMethodField()
    comments = comment.Serializer(read_only=True, many=True)
    creator = AccountSerializer(read_only=True)
    artist = AccountSerializer(read_only=True)
    region = RegionSerializer(read_only=True)
    comments_count = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = "__all__"

    def get_comments_count(self, obj):
        """Method to get the number of comments for the event"""
        return Comment.objects.filter(event=obj).count()

    def get_likes_count(self, obj):
        """Method to get the number of likes for the event"""
        return Like.objects.filter(event=obj).count()

    def get_likes(self, obj):
        """Method to get likes as a dictionary with account ID as key"""
        likes = Like.objects.filter(event=obj)
        return {like.author.id: like.id for like in likes}
