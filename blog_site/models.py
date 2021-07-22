from django.db import models

# Create your models here.
class Gaming(models.Model):
    title = models.CharField(max_length=50, verbose_name='Gaming Article Title', blank=False, null=False)
    desc = models.CharField(max_length=200, verbose_name='Article Description', blank=False, null=False)
    content = models.TextField(verbose_name='Article Content', default = "Placeholder")
    keywords = models.CharField(max_length=100, verbose_name='Article Keywords', default = "Placeholder")
    author = models.CharField(max_length=60, verbose_name='Article Author', blank=False, null=False, default='Anon')
    post_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + ' - ' + self.author

class Essay(models.Model):
    title = models.CharField(max_length=50, verbose_name='Essay Article Title', blank=False, null=False)
    desc = models.CharField(max_length=200, verbose_name='Article Description', blank=False, null=False)
    content = models.TextField(verbose_name='Article Content', default = "Placeholder")
    keywords = models.CharField(max_length=100, verbose_name='Article Keywords', default = "Placeholder")
    author = models.CharField(max_length=60, verbose_name='Article Author', blank=False, null=False, default='Anon')
    post_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title + ' - ' + self.author

class Contact(models.Model):
    email = models.EmailField(verbose_name='User Email', blank=False, null=False)
    subject = models.CharField(max_length=255, verbose_name='Subject Line')
    message = models.TextField(max_length=10000)

    def __str__(self) -> str:
        return self.email

    def get_absolute_url(self):
        return 'contact_success'
