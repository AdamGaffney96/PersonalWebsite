from django.contrib import admin
from .models import *
from django_summernote.admin import SummernoteModelAdmin

class GamingAdmin(SummernoteModelAdmin):
    summernote_fields = ('content', )

class EssayAdmin(SummernoteModelAdmin):
    summernote_fields = ('content', )

# Register your models here.
admin.site.register(Gaming, GamingAdmin)
admin.site.register(Contact)
admin.site.register(Essay, EssayAdmin)