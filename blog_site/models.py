from django.db import models
from django.utils.text import slugify
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Gaming(models.Model):
    title = models.CharField(max_length=50, verbose_name='Gaming Article Title')
    thumb = models.CharField(max_length=100, verbose_name='Thumbnail Image')
    slug = models.SlugField(max_length=100, verbose_name='Slug Title', null=True, blank=True)
    desc = models.CharField(max_length=200, verbose_name='Article Description')
    content = models.TextField(verbose_name='Article Content', default = "Placeholder")
    keywords = models.CharField(max_length=100, verbose_name='Article Keywords', default = "Placeholder")
    author = models.CharField(max_length=60, verbose_name='Article Author', default='Anon')
    post_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + ' - ' + self.author

@receiver(post_save, sender=Gaming)
def post_save_receiver(sender, instance, *args, **kwargs):
   if not instance.slug:
       instance.slug = slugify(instance.title)
       instance.save()

class Essay(models.Model):
    title = models.CharField(max_length=50, verbose_name='Essay Article Title')
    thumb = models.CharField(max_length=100, verbose_name='Thumbnail Image')
    slug = models.SlugField(max_length=100, verbose_name='Slug Title', null=True, blank=True)
    desc = models.CharField(max_length=200, verbose_name='Article Description')
    content = models.TextField(verbose_name='Article Content', default = "Placeholder")
    keywords = models.CharField(max_length=100, verbose_name='Article Keywords', default = "Placeholder")
    author = models.CharField(max_length=60, verbose_name='Article Author', default='Anon')
    post_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + ' - ' + self.author

@receiver(post_save, sender=Essay)
def pre_save_receiver(sender, instance, *args, **kwargs):
   if not instance.slug:
       instance.slug = slugify(instance.title)
       instance.save()

class Contact(models.Model):
    email = models.EmailField(verbose_name='User Email', blank=False, null=False)
    subject = models.CharField(max_length=255, verbose_name='Subject Line')
    message = models.TextField(max_length=10000)

    def __str__(self) -> str:
        return self.email

    def get_absolute_url(self):
        return 'contact_success'
