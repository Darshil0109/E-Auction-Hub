from django.contrib import admin
from .models import Category,Item,Bid,UserInformation
# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display=('id','category')

admin.site.register(Category,CategoryAdmin)

class ItemsAdmin(admin.ModelAdmin):
    list_display=('id' , 'title', 'description' ,'category' , 'starting_bid' , 'current_bid' , 'image_url' ,'seller' , 'created_at','end_time','winner','status')
admin.site.register(Item,ItemsAdmin)

class UserInfoAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'user_id', 'profileimage_url', 'mobile', 'dateofbirth',
        'city', 'state', 'country', 'description', 'gender',
        'address', 'zipcode', 'about_user', 'joining_date'
    )
admin.site.register(UserInformation,UserInfoAdmin)


class BidModelAdmin(admin.ModelAdmin):
    list_display=('id' , 'bid_amount' , 'bid_time', 'item_id', 'user_id')
admin.site.register(Bid,BidModelAdmin)