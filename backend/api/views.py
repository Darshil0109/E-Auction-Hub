from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer, CategorySerializer, ItemModelSerializer, BidModelSerializer , UserInfoSerializer
from .models import Category, Item, Bid , UserInformation
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

# using viewsets from rest framework so that can accept all valid methods like GET,POST,PUT,DELETE etc..
# Querysets are about data retrieval from the database.
# Serializers are about data conversion and validation for API requests and responses.

# Create Viewset for User 
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Using TokenAuthentication provided by Django Rest Framework which means this Viewset require Token passed into Headers while requesting to access Data
    authentication_classes = (TokenAuthentication,)

# Create Viewset for Category 
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = (TokenAuthentication,)

# Create Viewset for UserInformation  
class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInformation.objects.all()
    serializer_class = UserInfoSerializer
    authentication_classes = (TokenAuthentication,) 

# Create Viewset for Items   
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemModelSerializer
    authentication_classes = (TokenAuthentication,) 

# Create Viewset for Bid 
class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidModelSerializer
    authentication_classes = (TokenAuthentication,)

# Create Viewset for Login Functionality
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
            refresh = RefreshToken.for_user(user)
            refresh['username'] = user.username
            refresh['email'] = email
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        
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
        # get data came from request
        email = request.data.get('email')
        username = request.data.get('username')
        first_name = request.data.get('firstname')
        last_name = request.data.get('lastname')
        password = request.data.get('password')

        # check if any field is missing or not
        if not all([email, first_name, username, last_name, password]):
            return Response("All fields are required", status=status.HTTP_400_BAD_REQUEST)

        try:
            # create_user method will automatically hash password 
            # create user with given data
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                password=password,
            )
            # if user created successfully generate refresh & access token and send them to response
            if user:
                refresh = RefreshToken.for_user(user)
                refresh['username'] = username
                refresh['email'] = email
                # return response with both tokens
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response("Invalid data Provided", status=status.HTTP_400_BAD_REQUEST)
        # handle exception
        except Exception as e:
            return Response("Error: " + str(e), status=status.HTTP_400_BAD_REQUEST)
