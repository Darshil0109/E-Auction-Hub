from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer,CategorySerializer,ItemModelSerializer,BidModelSerializer
from .models import Category,Item,Bid
# Create your views here.




class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset=Item.objects.all()
    serializer_class=ItemModelSerializer

class BidViewSet(viewsets.ModelViewSet):
    queryset=Bid.objects.all()
    serializer_class=BidModelSerializer

