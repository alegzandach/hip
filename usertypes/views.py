from rest_framework import viewsets
from usertypes.serializers import GeneralUserSerializer
from django.contrib.auth import get_user_model
from usertypes.models import GeneralUser

class GeneralUserViewSet(viewsets.ModelViewSet):
    serializer_class = GeneralUserSerializer

    def get_queryset(self):
        user = self.request.user
        return GeneralUser.objects.filter(email=user.email)
