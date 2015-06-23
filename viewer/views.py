from viewer.models import STL
from rest_framework import viewsets
from viewer.serializers import STLSerializer

# Create your views here.

class STLViewSet(viewsets.ModelViewSet):
    queryset = STL.objects.all()
    serializer_class = STLSerializer