from django.shortcuts import render
from .models import *
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
from django.utils.text import slugify
import requests
from django.http import HttpResponse
from django.core.paginator import Paginator

# Create your views here.

def home(request):
    
    gaming = Gaming.objects.all()

    essays = Essay.objects.all()

    context = {"gaming": gaming,
    "essays": essays}
    return render(request, 'blog_site/home.html', context)

def gaming(request):
    # gaming = Gaming.objects.all()
    gaming = [
        {"title": 'Test Title 1',
        "slug": 'test-title-1',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 2',
        "slug": 'test-title-2',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 3',
        "slug": 'test-title-3',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 4',
        "slug": 'test-title-4',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 5',
        "slug": 'test-title-5',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 6',
        "slug": 'test-title-6',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 7',
        "slug": 'test-title-7',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 8',
        "slug": 'test-title-8',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 9',
        "slug": 'test-title-9',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 10',
        "slug": 'test-title-10',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
        {"title": 'Test Title 11',
        "slug": 'test-title-11',
        "thumb": 'blog_site/img/Caves and Cliffs.jpg',
        },
    ]
    paginator = Paginator(gaming, 6)
    page = request.GET.get('page')
    gaming = paginator.get_page(page)
    context = {'gaming': gaming}
    return render(request, 'blog_site/gaming.html', context)

def essays(request):
    essays = Essay.objects.all()
    context = {'essays': essays}
    return render(request, 'blog_site/essays.html', context)

def contactsubmit(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            newContact = Contact()
            newContact.email = request.POST['email']
            newContact.subject = request.POST['subject']
            newContact.message = request.POST['message']
            # newContact.save()
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

def eiahome(request):
    return render(request, 'blog_site/eia_home.html')

def singlereview(request, slug):
    q = Gaming.objects.filter(slug__iexact = slug)
    print(q)
    if q.exists(): 
        q = q.first()
    else:
        return HttpResponse('<h1>Post Not Found</h1>')
    context = {
        "pk": q.pk,
        "title": q.title,
        "slug": q.slug,
        "desc": q.desc,
        "author": q.author,
        "content": q.content,
        "post_date": q.post_date,
    }
    return render(request, 'blog_site/base_review.html', context)
    
def singleessay(request, slug):
    q = Essay.objects.filter(slug__iexact = slug)
    print(q)
    if q.exists(): 
        q = q.first()
    else:
        return HttpResponse('<h1>Post Not Found</h1>')
    context = {
        "pk": q.pk,
        "title": q.title,
        "slug": q.slug,
        "desc": q.desc,
        "author": q.author,
        "content": q.content,
        "post_date": q.post_date,
    }
    return render(request, 'blog_site/base_review.html', context)