from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('gaming', views.gaming, name = "gaming"),
    path('essays', views.essays, name = "essays"),
    path('contact', views.contactsubmit, name = "contact"),
    path('contact/success', views.contactsuccess, name = "contact_success"),
    path('contact/failure', views.contactfailure, name = "contact_failure"),
]