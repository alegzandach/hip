from django.contrib.auth.models import Group
from rest_framework import viewsets
from accounts.serializers import UserSerializer, GroupSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(email=user)

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
