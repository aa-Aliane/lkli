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


class Comment(models.Model):
    """
    Comment model
    """

    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField()
    dislikes = models.IntegerField()

    event = models.ForeignKey(
        "Event", on_delete=models.CASCADE, related_name="comments"
    )


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
