"comment serializer"
from accounts.serializers import AccountSerializer
from django.utils import timezone
from django.utils.timesince import timesince
from events.models import Comment, Like
from events.serializers import activity, like
from rest_framework import serializers
from utils.date import significant_time_since


class Serializer(serializers.ModelSerializer):
    """_summary_"""

    author = AccountSerializer(read_only=True)
    time_ago = serializers.SerializerMethodField()
    count_responses = serializers.SerializerMethodField()
    count_likes = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    date = serializers.DateTimeField(format="%Y-%m-%d à %H:%M", read_only=True)

    class Meta:
        """_meta_"""

        model = Comment
        fields = "__all__"

    def get_time_ago(self, obj):
        aware_date = timezone.localtime(obj.date)
        now = timezone.localtime(timezone.now())
        time_since = timesince(aware_date, now)
        return time_since.split(", ")[0]

    def get_count_responses(self, obj):
        return Comment.objects.filter(comment=obj).count()

    def get_count_likes(self, obj):
        return Like.objects.filter(comment=obj).count()

    def get_is_liked(self, obj):
        user = self.context.get("request").user
        if user.is_authenticated:
            like_ = Like.objects.filter(author=user, comment=obj).first()
            if like_:
                return like.Serializer(like_).data
        return False
