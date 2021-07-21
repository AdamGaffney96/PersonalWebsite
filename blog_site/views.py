from django.shortcuts import render
from .models import Gaming
from .forms import GamingListForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
# Import the logout function from django.contrib.auth below
from django.contrib.auth import logout
from django.urls import reverse_lazy
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView

# Create your views here.

def home(request):
    
    gaming = [
        {"title": "Minecraft 1.18 Snapshot Review",
        "image": 'blog_site/img/Minecraft Video.png',
        "publish_date": "2020-09-25"},
        {"title": "Nier Automata Review",
        "image": 'blog_site/img/Caves and Cliffs.jpg',
        "publish_date": "2020-10-03"},
        {"title": "An Introduction to Inverse Semigroups",
        "image": 'blog_site/img/MM401 Project.png',
        "publish_date": "2019-06-26"}
    ]

    essays = [
        {"title": "Minecraft 1.17 Update Review",
        "image": 'blog_site/img/Caves and Cliffs.jpg',
        "publish_date": "2021-06-20"},
        {"title": "An Introduction to Inverse Semigroups",
        "image": 'blog_site/img/MM401 Project.png',
        "publish_date": "2019-06-26"},
            {"title": "An Introduction to Inverse Semigroups",
        "image": 'blog_site/img/MM401 Project.png',
        "publish_date": "2019-06-27"}
    ]

    context = {"gaming": gaming,
    "essays": essays}
    return render(request, 'blog_site/home.html', context)

def gaming(request):
    return render(request, 'blog_site/gaming.html')

def essays(request):
    return render(request, 'blog_site/essays.html')

def contact(request):
    return render(request, 'blog_site/contact.html')