# Generated by Django 3.2.5 on 2022-02-28 23:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_site', '0017_auto_20210812_1306'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sudoku',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Sudoku Title')),
                ('slug', models.SlugField(blank=True, max_length=100, null=True, verbose_name='Slug Title')),
                ('ruleset', models.CharField(max_length=500, verbose_name='Sudoku Ruleset')),
                ('board', models.CharField(max_length=200, verbose_name='Sudoku Board')),
                ('html', models.CharField(max_length=300, verbose_name='HTML to load')),
                ('post_date', models.DateTimeField(auto_now_add=True)),
                ('last_edited', models.DateTimeField(auto_now=True)),
                ('keywords', models.ManyToManyField(to='blog_site.Keyword')),
                ('type', models.ManyToManyField(to='blog_site.Type')),
            ],
            options={
                'verbose_name_plural': 'Sudoku Puzzles',
            },
        ),
    ]
