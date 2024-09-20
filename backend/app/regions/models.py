"models"
from django.contrib.gis.db import models


class Region(models.Model):
    """
    Region model
    """

    name = models.CharField(max_length=255)
    lat = models.FloatField(null=True)
    lng = models.FloatField(null=True)
