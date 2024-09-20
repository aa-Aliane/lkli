"models"
from django.db import models


class Categorie(models.Model):
    """
    Categorie model
    """

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Tag(models.Model):
    """
    Tag model
    """

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Event(models.Model):
    """
    Event model
    """

    name = models.CharField(max_length=500)
    description = models.TextField(max_length=2000)
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    votes = models.IntegerField()
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True, null=True)
    cat = models.ForeignKey(
        "Categorie", on_delete=models.CASCADE, related_name="events", null=True
    )
    tags = models.ManyToManyField("Tag", related_name="events")
    creator = models.ForeignKey(
        "accounts.Account",
        on_delete=models.CASCADE,
        related_name="creator_events",
        null=True,
    )
    artist = models.ForeignKey(
        "accounts.Account",
        on_delete=models.CASCADE,
        related_name="artist_events",
        null=True,
    )
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    lieu = models.CharField(max_length=200, blank=True, null=True)
    region = models.ForeignKey(
        "regions.Region", on_delete=models.CASCADE, related_name="events"
    )
    url = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name


class Activity(models.Model):
    """
    Activity abstract base class
    """

    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Like(Activity):
    """
    Like model
    """

    like = models.BooleanField(default=True)

    author = models.ForeignKey(
        "accounts.Account", on_delete=models.CASCADE, related_name="account_likes"
    )
    event = models.ForeignKey(
        "Event",
        on_delete=models.CASCADE,
        related_name="event_likes",
        null=True,
        blank=True,
    )

    comment = models.ForeignKey(
        "events.Comment",
        on_delete=models.CASCADE,
        related_name="comment_likes",
        null=True,
        blank=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["author", "event"],
                condition=models.Q(comment__isnull=True),
                name="unique_author_event_like",
            ),
            models.UniqueConstraint(
                fields=["author", "comment"], name="unique_author_comment_like"
            ),
            models.CheckConstraint(
                check=(
                    models.Q(event__isnull=False, comment__isnull=True)
                    | models.Q(event__isnull=True, comment__isnull=False)
                ),
                name="likes:event_or_comment_not_both",
            ),
        ]

    def __str__(self):
        return f"Like by {self.author} on {self.event}: {'liked' if self.like else 'not liked'}"


class Comment(Activity):
    """
    Comment model
    """

    content = models.TextField()

    author = models.ForeignKey(
        "accounts.Account", on_delete=models.CASCADE, related_name="author_comments"
    )
    event = models.ForeignKey(
        "Event",
        on_delete=models.CASCADE,
        related_name="event_comments",
        null=True,
        blank=True,
    )

    comment = models.ForeignKey(
        "events.Comment",
        on_delete=models.CASCADE,
        related_name="comment_comments",
        null=True,
        blank=True,
    )

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=(
                    models.Q(event__isnull=False, comment__isnull=True)
                    | models.Q(event__isnull=True, comment__isnull=False)
                ),
                name="event_or_comment_not_both",
            )
        ]

    def __str__(self):
        if self.event:
            return f"Comment by {self.author} on {self.event}"
        return f"Comment by {self.author} to {self.comment}"
