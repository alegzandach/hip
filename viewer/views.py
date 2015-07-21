from viewer.models import STL
from rest_framework import viewsets
from viewer.serializers import STLSerializer

# Create your views here.

class STLViewSet(viewsets.ModelViewSet):
    serializer_class = STLSerializer
    queryset = STL.objects.none()

    def get_queryset(self):
        user = self.request.user
        return STL.objects.filter(user=user.generaluser)
