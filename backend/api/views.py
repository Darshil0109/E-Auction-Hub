from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer,CategorySerializer
from .models import Category
# Create your views here.




class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer