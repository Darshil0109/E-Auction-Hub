from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category,Item,Bid , UserInformation

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields=['id','category']
        
class ItemModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id' , 'title', 'description' ,'category' , 'starting_bid' , 'current_bid' , 'image_url' ,'seller' , 'created_at','end_time','winner','status']


class BidModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid 
        fields = ['id' , 'bid_amount' , 'bid_time', 'item_id', 'user_id']


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInformation
        fields = [
            'id', 'user_id', 'profileimage_url', 'mobile', 'dateofbirth',
            'city', 'state', 'country', 'description', 'gender',
            'address', 'zipcode', 'about_user', 'joining_date'
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }
