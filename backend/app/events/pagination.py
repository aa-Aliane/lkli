"pagination settings"
from rest_framework.pagination import PageNumberPagination


class EventsPagination(PageNumberPagination):
    "pagination class for events"
    ordering = "-created_at"
    page_size = 5
