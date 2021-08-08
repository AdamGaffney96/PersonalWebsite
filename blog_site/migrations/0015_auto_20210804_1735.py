# Generated by Django 3.2.5 on 2021-08-04 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_site', '0014_auto_20210804_1606'),
    ]

    operations = [
        migrations.AddField(
            model_name='essay',
            name='article_type',
            field=models.CharField(default='essay', max_length=50, verbose_name='Grouping Type'),
        ),
        migrations.AddField(
            model_name='gaming',
            name='article_type',
            field=models.CharField(default='gaming', max_length=50, verbose_name='Grouping Type'),
        ),
    ]