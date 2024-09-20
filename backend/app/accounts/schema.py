from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema

from .serializers import AccountSerializer

account_list_docs = extend_schema(
    responses=AccountSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="username",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Filter accounts by username.",
        ),
        OpenApiParameter(
            name="job_title",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Filter accounts by job title.",
        ),
        OpenApiParameter(
            name="role",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Filter accounts by role.",
        ),
        OpenApiParameter(
            name="company",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="Filter accounts by company ID.",
        ),
    ],
)
