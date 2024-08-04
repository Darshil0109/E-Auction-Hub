from django.contrib import admin
from .models import Category,Item,Bid
# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display=('id','category')

admin.site.register(Category,CategoryAdmin)

class ItemsAdmin(admin.ModelAdmin):
    list_display=('id' , 'title', 'description' ,'category' , 'starting_bid' , 'image_url' ,'seller' , 'created_at','end_time','winner','status')
admin.site.register(Item,ItemsAdmin)


class BidModelAdmin(admin.ModelAdmin):
    list_display=('id' , 'bid_amount' , 'bid_time', 'item_id', 'user_id')
admin.site.register(Bid,BidModelAdmin)