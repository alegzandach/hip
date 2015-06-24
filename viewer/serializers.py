from viewer.models import STL
from rest_framework import serializers

class STLSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = STL
        fields = ('id', 'url',)
