from django.contrib.auth.models import Group
from rest_framework import viewsets
from accounts.serializers import UserSerializer, GroupSerializer
from django.contrib.auth import get_user_model
from rest_framework.authtoken import views

from rest_framework.views import APIView
from rest_framework import parsers
from rest_framework import renderers
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
