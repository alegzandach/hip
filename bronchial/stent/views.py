from models import Airway
from rest_framework import viewsets 
from serializers import AirwaySerializer

class AirwayViewSet(viewsets.ModelViewSet):
    queryset = Airway.objects.all()
    serializer_class = AirwaySerializer
