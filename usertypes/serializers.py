from usertypes.models import GeneralUser
from rest_framework import serializers

class GeneralUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = GeneralUser
        fields = ('url', 'email', 'first_name', 'last_name')
