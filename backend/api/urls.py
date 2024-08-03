from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter  # import this for viewset
from .views import UserViewSet,CategoryViewSet
router = DefaultRouter()
router.register('users',UserViewSet)
router.register('category',CategoryViewSet)

urlpatterns = [
    path('api/',include(router.urls)),
    
]
