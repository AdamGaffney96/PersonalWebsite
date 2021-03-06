# Generated by Django 3.2.5 on 2021-08-12 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog_site', '0016_project'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='contact',
            options={'verbose_name_plural': 'Contacts'},
        ),
        migrations.AlterModelOptions(
            name='essay',
            options={'verbose_name_plural': 'Essays'},
        ),
        migrations.AlterModelOptions(
            name='gaming',
            options={'verbose_name_plural': 'Gaming Articles'},
        ),
        migrations.AlterModelOptions(
            name='keyword',
            options={'verbose_name_plural': 'Article Keywords'},
        ),
        migrations.AlterModelOptions(
            name='project',
            options={'verbose_name_plural': 'Projects'},
        ),
        migrations.AlterModelOptions(
            name='type',
            options={'verbose_name_plural': 'Article Types'},
        ),
        migrations.AddField(
            model_name='contact',
            name='last_contact',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
