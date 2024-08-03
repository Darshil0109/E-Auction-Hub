from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields=['id','category']
        



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
