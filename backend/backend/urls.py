from django.contrib import admin
from django.urls import path,include


# admin/ for Django-admin panel
# /  for api app's urls.py file
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('api.urls')),
]
