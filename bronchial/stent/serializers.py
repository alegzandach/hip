from models import Airway
from rest_framework import serializers

class AirwaySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Airway
        fields = ('stl',)
