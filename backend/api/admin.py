from django.contrib import admin
from .models import Category,Item,Bid,UserInformation

# fields written inside list_display tuple displayed in admin panel 
 
# ModelAdmin for Category Model
class CategoryAdmin(admin.ModelAdmin):
    list_display=('id','category')
# Registering Category Model
admin.site.register(Category,CategoryAdmin)


# ModelAdmin for Items Model
class ItemsAdmin(admin.ModelAdmin):
    list_display=('id' , 'title', 'description' ,'category'  , 'starting_bid' , 'current_bid' , 'image_url' ,'seller', 'bidder' , 'created_at','end_time','winner','status')
# Registering Items Model
admin.site.register(Item,ItemsAdmin)

# ModelAdmin for UserInformation Model
class UserInfoAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'user_id', 'profileimage_url', 'mobile', 'dateofbirth',
        'city', 'state', 'country', 'description', 'gender',
        'address', 'zipcode', 'about_user', 'joining_date'
    )
# Registering UserInformation Model
admin.site.register(UserInformation,UserInfoAdmin)

# ModelAdmin for Bid Model
class BidModelAdmin(admin.ModelAdmin):
    list_display=('id' , 'bid_amount' , 'bid_time', 'item_id', 'user_id')
# Registering Bid Model
admin.site.register(Bid,BidModelAdmin)