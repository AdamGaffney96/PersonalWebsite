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
    keywords = models.ManyToManyField('Keyword')
    author = models.CharField(max_length=60, verbose_name='Article Author', default='Anon')
    type = models.ManyToManyField('Type')
    post_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)
    article_type = models.CharField(max_length=50, verbose_name='Grouping Type', default='gaming')

    def __str__(self):
        return self.title + ' - ' + self.author

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.title)
            super(Gaming, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Gaming Articles'

class Essay(models.Model):
    title = models.CharField(max_length=50, verbose_name='Essay Article Title')
    thumb = models.CharField(max_length=100, verbose_name='Thumbnail Image')
    slug = models.SlugField(max_length=100, verbose_name='Slug Title', null=True, blank=True)
    desc = models.CharField(max_length=200, verbose_name='Article Description')
    content = models.TextField(verbose_name='Article Content', default = "Placeholder")
    keywords = models.ManyToManyField('Keyword')
    author = models.CharField(max_length=60, verbose_name='Article Author', default='Anon')
    type = models.ManyToManyField('Type')
    post_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)
    article_type = models.CharField(max_length=50, verbose_name='Grouping Type', default='essay')

    def __str__(self):
        return self.title + ' - ' + self.author

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.title)
            super(Essay, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Essays'

class Keyword(models.Model):
    keyword = models.CharField(max_length=50, verbose_name='Keyword')

    def __str__(self):
        return self.keyword
    
    class Meta:
        verbose_name_plural = 'Article Keywords'

class Type(models.Model):
    type = models.CharField(max_length=60, verbose_name='Article Type')

    def __str__(self):
        return self.type
    
    class Meta:
        verbose_name_plural = 'Article Types'

class Contact(models.Model):
    email = models.EmailField(verbose_name='User Email', blank=False, null=False)
    subject = models.CharField(max_length=255, verbose_name='Subject Line')
    message = models.TextField(max_length=10000)
    last_contact = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.email

    def get_absolute_url(self):
        return 'contact_success'

    class Meta:
        verbose_name_plural = 'Contacts'

class Project(models.Model):
    title = models.CharField(max_length=50, verbose_name='Project Title')
    thumb = models.CharField(max_length=100, verbose_name='Thumbnail Image')
    slug = models.SlugField(max_length=100, verbose_name='Slug Title', null=True, blank=True)
    desc = models.CharField(max_length=200, verbose_name='Project Description')
    html = models.CharField(max_length=300, verbose_name='HTML to load')
    keywords = models.ManyToManyField('Keyword')
    type = models.ManyToManyField('Type')
    post_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)
    article_type = models.CharField(max_length=50, verbose_name='Grouping Type', default='project')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.title)
            super(Project, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Projects'

@receiver(post_save, sender=Project)
def pre_save_receiver(sender, instance, *args, **kwargs):
   if not instance.slug:
       instance.slug = slugify(instance.title)
       instance.save()

# class EIAChars(models.Model):
#     name = models.CharField(verbose_name='Character Name', max_length=120, primary_key=True)
#     age = models.IntegerField()