# Generated by Django 5.0.7 on 2024-09-03 08:40

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_userinformation_joining_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinformation',
            name='joining_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
