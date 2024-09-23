from django.urls import path,include
from rest_framework.routers import DefaultRouter  # import this for viewset
from .views import UserViewSet,CategoryViewSet,ItemViewSet,BidViewSet,LoginAuthTokenViewSet,SignupAuthTokenViewSet,UserInfoViewSet
from django.conf import settings
from django.conf.urls.static import static

# Create Router for Different Endpoints
router = DefaultRouter() 
# Register Different Endpoints and Assign Views accordingly
router.register('users',UserViewSet)
router.register('category',CategoryViewSet)
router.register('items',ItemViewSet)
router.register('bids',BidViewSet)
router.register('userinfo',UserInfoViewSet)

# Add Url patterens for different url endpoints 
# All Data Related to Auction items will be visible for /api endpoint
# And also added line at bottom to access static files for django
urlpatterns = [
    path('api/',include(router.urls)),
    path('auth/login/',LoginAuthTokenViewSet.as_view(),name='login'),
    path('auth/signup/',SignupAuthTokenViewSet.as_view(),name='signup'),
    
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
