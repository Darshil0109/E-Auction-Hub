# Generated by Django 5.0.7 on 2024-09-03 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_userinformation_joining_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinformation',
            name='dateofbirth',
            field=models.DateField(null=True),
        ),
    ]
