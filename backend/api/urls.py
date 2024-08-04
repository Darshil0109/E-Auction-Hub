from django.urls import path,include
from rest_framework.routers import DefaultRouter  # import this for viewset
from .views import UserViewSet,CategoryViewSet,ItemViewSet,BidViewSet
from django.conf import settings
from django.conf.urls.static import static
router = DefaultRouter()
router.register('users',UserViewSet)
router.register('category',CategoryViewSet)
router.register('items',ItemViewSet)
router.register('bids',BidViewSet)

urlpatterns = [
    path('api/',include(router.urls)),
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
