from django.db import models

# Create your models here.
class Gaming(models.Model):
    title = models.CharField(max_length=50, verbose_name='Gaming Article Title', blank=False, null=False)
    desc = models.CharField(max_length=200, verbose_name='Article Description', blank=False, null=False)
    author = models.CharField(max_length=60, verbose_name='Article Author', blank=False, null=False, default='Anon')
    post_date = models.DateTimeField(auto_now_add=True)
    last_edited = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title + ' - ' + self.author