from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    category=models.CharField(max_length=30)

    def __str__(self):
        return self.category
    

class Item(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    starting_bid = models.DecimalField(max_digits=10, decimal_places=0)
    current_bid = models.DecimalField(max_digits=10, decimal_places=0 )
    image_url = models.ImageField(upload_to='auctionItemImages', blank=True, max_length=500)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='items_for_sale')
    created_at = models.DateTimeField()  # Allow user to provide this value
    end_time = models.DateTimeField()  # Allow user to provide this value
    winner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='won_items')
    status = models.CharField(max_length=20, choices=[
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ], default='active')


class Bid(models.Model):
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    bid_time = models.DateTimeField()
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

