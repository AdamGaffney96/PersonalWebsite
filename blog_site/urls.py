from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('gaming', views.gaming, name = "gaming"),
    path('gaming/reviews', views.gaming_review, name = "gaming_review"),
    path('gaming/opinions', views.gaming_opinion, name = "gaming_opinions"),
    path('gaming/discussions', views.gaming_discussion, name = "gaming_discussions"),
    path('gaming/<slug>', views.singlereview, name = 'single_review'),
    path('essays', views.essays, name = "essays"),
    path('essays/educational', views.essay_educational, name = "essay_educational"),
    path('essays/discussions', views.essay_discussions, name = "essay_discussions"),
    path('essays/opinions', views.essay_opinions, name = "essay_opinions"),
    path('essays/<slug>', views.singleessay, name = 'single_essay'),
    path('projects', views.projects, name = 'projects'),
    path('projects/<slug>', views.singleproject, name = 'single_project'),
    path('contact', views.contactsubmit, name = "contact"),
    path('contact/success', views.contactsuccess, name = "contact_success"),
    path('contact/failure', views.contactfailure, name = "contact_failure"),
    path('newsletter', views.newsletter, name = "newsletter"),
]