from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

# Category model
class Category(models.Model):
    category=models.CharField(max_length=30)

    def __str__(self):
        return self.category

# Items model
class Item(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    starting_bid = models.DecimalField(max_digits=10, decimal_places=0)
    current_bid = models.DecimalField(max_digits=10, decimal_places=0,blank=True,null=True)
    image_url = models.ImageField(upload_to='auctionItemImages/', blank=True, null = True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items_for_sale')
    bidder = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items_for_bid',blank=True,null=True)
    created_at = models.DateTimeField(default=timezone.now)  
    end_time = models.DateTimeField()
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='won_items')
    status = models.CharField(max_length=20, choices=[
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ], default='active')

# Bid Model
class Bid(models.Model):
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    bid_time = models.DateTimeField()
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

# UserInformation Model
class UserInformation(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    profileimage_url = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    mobile = models.CharField(max_length=20, blank=True)
    dateofbirth = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=10000, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    zipcode = models.CharField(max_length=20, blank=True)
    description = models.CharField(max_length=1000, blank=True)
    about_user = models.TextField(blank=True)
    gender = models.CharField(max_length=10, blank=True)
    joining_date = models.DateField(default=timezone.now)
    
