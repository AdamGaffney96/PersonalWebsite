# Generated by Django 3.2.5 on 2022-03-19 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_site', '0019_auto_20220319_1339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cheatsheetsection',
            name='verbose',
            field=models.CharField(max_length=50, verbose_name='Coding Language for Display'),
        ),
        migrations.DeleteModel(
            name='Cheatsheet',
        ),
    ]
