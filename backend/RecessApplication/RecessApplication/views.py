from django.contrib.auth.models import User, Group

from rest_framework import generics, viewsets

from RecessApplication.serializers import UserSerializer, GroupSerializer, SnippetSerializer
from RecessApplication.models import Snippet

# View overview
# CreateAPIView - POST
# ListAPIView - GET collection
# RetrieveAPIView - GET single
# DestroyAPIView - DELETE
# UpdateAPIView - PUT and POST single
# ListCreateAPIView - GET and POST
# RetrieveUpdateAPIView - GET and PUT and PATCH single
# RetrieveDestroyAPIView - GET and DELETE single
# RetrieveUpdateDestroyAPIView - GET and PUT and PATCH and DELETE single

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer