# Generated by Django 3.2.5 on 2021-07-22 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_site', '0009_alter_essay_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='essay',
            name='slug',
            field=models.SlugField(blank=True, max_length=100, null=True, verbose_name='Slug Title'),
        ),
    ]