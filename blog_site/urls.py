from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('gaming', views.gaming, name = "gaming"),
    path('essays', views.essays, name = "essays"),
    path('contact', views.ContactSubmit.as_view(), name = "contact"),
    path('contact_success', views.contact_success, name = "contact_success"),
]