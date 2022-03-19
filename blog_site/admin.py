from django.contrib import admin
from .models import *
from django_summernote.admin import SummernoteModelAdmin

class GamingAdmin(SummernoteModelAdmin):
    summernote_fields = ('content', )
    readonly_fields = ('post_date', 'last_edited',)

class EssayAdmin(SummernoteModelAdmin):
    summernote_fields = ('content', )
    readonly_fields = ('post_date', 'last_edited',)

class ContactAdmin(admin.ModelAdmin):
    readonly_fields = ('last_contact',)

class ProjectAdmin(admin.ModelAdmin):
    readonly_fields = ('post_date', 'last_edited',)

class SudokuAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'post_date', 'last_edited',)
    
class CheatsheetAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'post_date', 'last_edited',)

# Register your models here.
admin.site.register(Gaming, GamingAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Essay, EssayAdmin)
admin.site.register(Keyword)
admin.site.register(Type)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Sudoku, SudokuAdmin)
admin.site.register(CheatsheetSection, CheatsheetAdmin)