from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('gaming', views.gaming, name = "gaming"),
    path('gaming/<slug>', views.singlereview, name = 'single_review'),
    path('essays', views.essays, name = "essays"),
    path('essays/<slug>', views.singleessay, name = 'single_essay'),
    path('contact', views.contactsubmit, name = "contact"),
    path('contact/success', views.contactsuccess, name = "contact_success"),
    path('contact/failure', views.contactfailure, name = "contact_failure"),
    path('eia/home', views.eiahome, name = "eiahome"),
]