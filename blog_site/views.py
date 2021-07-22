from django.shortcuts import render
from .models import Gaming, Contact
from .forms import ContactForm, GamingListForm
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
# Import the logout function from django.contrib.auth below
from django.contrib.auth import logout
from django.urls import reverse_lazy
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
import smtplib
import requests

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

def contactsubmit(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            newContact = Contact()
            newContact.email = request.POST['email']
            newContact.subject = request.POST['subject']
            newContact.message = request.POST['message']
            newContact.save()
            email_subject = f'Email from {form.cleaned_data["email"]} - {form.cleaned_data["subject"]}'
            email_message = form.cleaned_data['message']
            try:
                send_mail(email_subject, email_message, settings.CONTACT_EMAIL, settings.ADMIN_EMAILS)
            except smtplib.SMTPException:
                return redirect('contact_failure')
            return redirect('contact_success')
    return render(request, 'blog_site/contact_form.html')

def contactsuccess(request):
    return render(request, 'blog_site/contact_success.html')

def contactfailure(request):
    return render(request, 'blog_site/contact_failure.html')