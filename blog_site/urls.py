from django.urls import path, re_path
from . import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', views.home, name = "home"),
    path()
]