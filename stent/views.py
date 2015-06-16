from stent.models import Airway
from rest_framework import viewsets 
from stent.serializers import AirwaySerializer
from django.views.generic.base import TemplateView

class AirwayViewSet(viewsets.ModelViewSet):
    queryset = Airway.objects.all()
    serializer_class = AirwaySerializer

class PartialGroupView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(PartialGroupView, self).get_context_data(**kwargs)
        return context
