# Generated by Django 5.0.7 on 2024-09-04 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_userinformation_dateofbirth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinformation',
            name='about_user',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='userinformation',
            name='description',
            field=models.CharField(max_length=10000),
        ),
    ]
