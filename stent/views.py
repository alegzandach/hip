from stent.models import Airway
from rest_framework import viewsets 
from stent.serializers import AirwaySerializer

class AirwayViewSet(viewsets.ModelViewSet):
    queryset = Airway.objects.all()
    serializer_class = AirwaySerializer
