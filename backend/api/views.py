from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer, CategorySerializer, ItemModelSerializer, BidModelSerializer
from .models import Category, Item, Bid
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.views import APIView

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = (TokenAuthentication,)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemModelSerializer
    authentication_classes = (TokenAuthentication,)

class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidModelSerializer
    authentication_classes = (TokenAuthentication,)

class LoginAuthTokenViewSet(APIView):
    
    authentication_classes = (TokenAuthentication,)
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({"error": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
        user = authenticate(username=user.username, password=password)
        if user is not None:
            
            return Response("Login Successfully",status=status.HTTP_200_OK)
        else:
            return Response("Invalid email or password", status=status.HTTP_401_UNAUTHORIZED)

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication

class SignupAuthTokenViewSet(APIView):
    
    authentication_classes = (TokenAuthentication,)
    
    def post(self, request):
        email = request.data.get('email')
        username = request.data.get('username')
        first_name = request.data.get('firstname')
        last_name = request.data.get('lastname')
        password = request.data.get('password')


        if not all([email, first_name, username, last_name, password]):
            return Response("All fields are required", status=status.HTTP_400_BAD_REQUEST)

        try:
            
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                password=password,
            )
            if user:
                return Response("Data Added Successfully", status=status.HTTP_201_CREATED)
            else:
                return Response("Invalid data Provided", status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response("Error: " + str(e), status=status.HTTP_400_BAD_REQUEST)
