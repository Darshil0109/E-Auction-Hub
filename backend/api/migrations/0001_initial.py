# Generated by Django 5.0.7 on 2024-09-03 05:47

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('starting_bid', models.DecimalField(decimal_places=0, max_digits=10)),
                ('current_bid', models.DecimalField(decimal_places=0, max_digits=10)),
                ('image_url', models.ImageField(blank=True, max_length=500, upload_to='auctionItemImages')),
                ('created_at', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('status', models.CharField(choices=[('active', 'Active'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], default='active', max_length=20)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items_for_sale', to=settings.AUTH_USER_MODEL)),
                ('winner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='won_items', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Bid',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bid_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('bid_time', models.DateTimeField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.item')),
            ],
        ),
        migrations.CreateModel(
            name='UserInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profileimage_url', models.ImageField(blank=True, null=True, upload_to='profile_images/')),
                ('mobile', models.CharField(max_length=20)),
                ('dateofbirth', models.DateField()),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=100)),
                ('zipcode', models.CharField(max_length=20)),
                ('description', models.TextField()),
                ('about_user', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=10)),
                ('joining_date', models.DateField(default=django.utils.timezone.now)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
