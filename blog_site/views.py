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
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os
import json

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
            message = Mail(
            from_email=settings.CONTACT_EMAIL,
            to_emails=settings.ADMIN_EMAILS,
            subject=request.POST['subject'],
            html_content=request.POST['message'])
            message.dynamic_template_data = {
            'email': request.POST['email'],
            'subject': request.POST['subject'],
            'message': request.POST['message']
            }
            message.template_id = settings.TEMPLATE_ID_CONTACT
            try:
                sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
            except Exception as e:
                print(e.message)
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

def newsletter(request):
    return render(request, 'blog_site/newsletter.html')