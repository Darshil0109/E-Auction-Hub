from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category,Item,Bid , UserInformation

# I am using Serializers to convert complex data types, such as Django model instances, into native Python datatypes that can then be easily rendered into JSON, XML, or other content types

# Creating serializer to get Data about Different Categories of items that can be placed for Auction
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields=['id','category']
        
# Creating serializer to get Data about Items placed for Auction
class ItemModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id' , 'title', 'description' ,'category' , 'bidder' , 'starting_bid' , 'current_bid' , 'image_url' ,'seller' , 'created_at','end_time','winner','status']

# Creating serializer to get Data about Bids placed on Item
class BidModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid 
        fields = ['id' , 'bid_amount' , 'bid_time', 'item_id', 'user_id']

# Creating serializer to get Data about User Informations other than Basic Details (username,email,firstname,lastname) of User Registered into the Database
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInformation
        fields = [
            'id', 'user_id', 'profileimage_url', 'mobile', 'dateofbirth',
            'city', 'state', 'country', 'description', 'gender',
            'address', 'zipcode', 'about_user', 'joining_date'
        ]

# Creating serializer to get Basic Details (username,email,firstname,lastname) about Users Registered into the database
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }
