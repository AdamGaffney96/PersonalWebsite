# Generated by Django 3.2.5 on 2022-03-19 13:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('blog_site', '0020_auto_20220319_1344'),
    ]

    operations = [
        migrations.AddField(
            model_name='cheatsheetsection',
            name='last_edited',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='cheatsheetsection',
            name='post_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
