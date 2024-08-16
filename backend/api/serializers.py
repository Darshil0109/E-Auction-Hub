from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category,Item,Bid

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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }

    def validate_username(self, value):
        if not value:
            raise serializers.ValidationError("This field is required.")
        return value

    def validate_first_name(self, value):
        if not value:
            raise serializers.ValidationError("This field is required.")
        return value

    def validate_last_name(self, value):
        if not value:
            raise serializers.ValidationError("This field is required.")
        return value

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("This field is required.")
        return value

    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError("This field is required.")
        return value

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
