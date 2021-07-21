from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('gaming', views.gaming, name = "gaming"),
    path('essays', views.essays, name = "essays"),
    path('contact', views.contact, name = "contact")
]