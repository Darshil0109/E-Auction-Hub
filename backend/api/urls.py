from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter  # import this for viewset
router = DefaultRouter()


urlpatterns = [
    path('api/',include(router.urls)),
]
