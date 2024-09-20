from django.contrib import admin

from .models import Categorie, Comment, Event, Like, Tag

admin.site.register(Event)
admin.site.register(Tag)
admin.site.register(Categorie)
admin.site.register(Comment)
admin.site.register(Like)
