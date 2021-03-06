from django.shortcuts import render
from .models import *
from .forms import ContactForm, GamingListForm
from django.conf import settings
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
# Import the logout function from django.contrib.auth below
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import logout
from django.http import Http404
from django.urls import reverse_lazy
from django.contrib.auth.forms import UserCreationForm
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
import smtplib
from django.utils.text import slugify
from datetime import datetime, timezone
import pytz
import requests
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os
import math
import json

# Create your views here.

def home(request):
    # Uncomment these for production and comment out the others. Reason being order by doesn't work correctly on SQLite but is fine on Postgres
    # gaming = Gaming.objects.all().order_by('-post_date')
    # essays = Essay.objects.all().order_by('-post_date')
    gaming = Gaming.objects.all()
    essays = Essay.objects.all()
    combined = gaming.union(essays).order_by('-post_date')
    context = {"gaming": gaming,
    "essays": essays, "combined": combined}
    return render(request, 'blog_site/base.html', context)

def coming_soon(request):
    context = {}
    return render(request, "blog_site/coming_soon.html", context)

def gaming(request):
    gaming = Gaming.objects.all()
    reviews = Gaming.objects.filter(type__type = 'Review').order_by('-post_date')
    opinion = Gaming.objects.filter(type__type = 'Opinion').order_by('-post_date')
    discussion = Gaming.objects.filter(type__type = 'Discussion').order_by('-post_date')
    context = {'reviews': reviews, 'opinion': opinion, 'discussion': discussion}
    return render(request, 'blog_site/gaming.html', context)

def gaming_review(request):
    gaming = Gaming.objects.filter(type__type='Review').order_by('-post_date')
    paginator = Paginator(gaming, 6)
    page = request.GET.get('page')
    gaming = paginator.get_page(page)
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
    context = {'gaming': gaming, 'users': users}
    return render(request, 'blog_site/gaming_reviews.html', context)

def gaming_opinion(request):
    gaming = Gaming.objects.filter(type__type='Opinion').order_by('-post_date')
    paginator = Paginator(gaming, 6)
    page = request.GET.get('page')
    gaming = paginator.get_page(page)
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
    context = {'gaming': gaming, 'users': users}
    return render(request, 'blog_site/gaming_opinions.html', context)

def gaming_discussion(request):
    gaming = Gaming.objects.filter(type__type='Discussion').order_by('-post_date')
    paginator = Paginator(gaming, 6)
    page = request.GET.get('page')
    gaming = paginator.get_page(page)
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
    context = {'gaming': gaming, 'users': users}
    return render(request, 'blog_site/gaming_discussions.html', context)

def essays(request):
    essays = Essay.objects.all()
    educational = Essay.objects.filter(type__type = 'Educational').order_by('-post_date')
    discussion = Essay.objects.filter(type__type = 'Discussion').order_by('-post_date')
    opinion = Essay.objects.filter(type__type = 'Opinion').order_by('-post_date')
    context = {'essays': essays, 'educational': educational, 'discussion': discussion, 'opinion': opinion}
    return render(request, 'blog_site/essays.html', context)

def essay_educational(request):
    essay = Essay.objects.filter(type__type='Educational').order_by('-post_date')
    paginator = Paginator(essay, 6)
    page = request.GET.get('page')
    essay = paginator.get_page(page)
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
    context = {'essay': essay, 'users': users}
    return render(request, 'blog_site/essay_educational.html', context)

def essay_discussions(request):
    essay = Essay.objects.filter(type__type='Discussion').order_by('-post_date')
    paginator = Paginator(essay, 6)
    page = request.GET.get('page')
    essay = paginator.get_page(page)
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
    context = {'essay': essay, 'users': users}
    return render(request, 'blog_site/essay_discussions.html', context)

def essay_opinions(request):
    essay = Essay.objects.filter(type__type='Opinions').order_by('-post_date')
    paginator = Paginator(essay, 6)
    page = request.GET.get('page')
    essay = paginator.get_page(page)
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
    context = {'essay': essay, 'users': users}
    return render(request, 'blog_site/essay_opinions.html', context)

def contactsubmit(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        current_contact = Contact.objects.filter(email = request.POST['email']).first()
        if not current_contact:
            current_contact = Contact(email = request.POST['email'], subject=request.POST['subject'], message=request.POST['message'])
        else:
            current_contact.subject = request.POST['subject']
            current_contact.message = request.POST['message']
            if (datetime.now(timezone.utc) - current_contact.last_contact).seconds/3600 < 12:
                timediff = 12 - (datetime.now(timezone.utc) - current_contact.last_contact).seconds/3600
                timediff_h = math.floor(timediff)
                timediff_m = int((timediff - math.floor(timediff)) * 60)
                context = {
                    'email': request.POST['email'], 
                    'timediff_h': timediff_h,
                    'timediff_m': timediff_m,
                    }
                return render(request, 'blog_site/contact_failure_quick.html', context)
        if form.is_valid():
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
                current_contact.save()
            except Exception as e:
                print(e.message)
                return redirect('contact_failure')
            return redirect('contact_success')
    return render(request, 'blog_site/contact_form.html')

def contactsuccess(request):
    return render(request, 'blog_site/contact_success.html')

def contactfailure(request):
    return render(request, 'blog_site/contact_failure.html')

def singlereview(request, slug):
    q = Gaming.objects.filter(slug__iexact = slug)
    if q.exists(): 
        q = q.first()
    else:
        raise Http404('Gaming article does not exist')
    keywords = ''
    for keyword in q.keywords.all():
        keywords += keyword.keyword + ", "
    keywords = keywords[:-2]
    context = {
        "q": q,
        "keywords": keywords,
    }
    return render(request, 'blog_site/base_review.html', context)

def singleessay(request, slug):

    q = Essay.objects.filter(slug__iexact = slug)
    print(q)
    if q.exists(): 
        q = q.first()
    else:
        raise Http404('Essay does not exist')
    keywords = ''
    for keyword in q.keywords.all():
        keywords += keyword.keyword + ", "
    keywords = keywords[:-2]
    context = {
        "q": q,
        "keywords": keywords,
    }
    return render(request, 'blog_site/base_review.html', context)

def newsletter(request):
    return render(request, 'blog_site/newsletter.html')

def projects(request):
    # Uncomment below for deployment
    # projects = Project.objects.all().order_by('-post_date')
    projects = Project.objects.all()
    paginator = Paginator(projects, 6)
    page = request.GET.get('page')
    projects = paginator.get_page(page)
    try:
        users = paginator.page(page)
    except PageNotAnInteger:
        users = paginator.page(1)
    except EmptyPage:
        users = paginator.page(paginator.num_pages)
    context = {'projects': projects, 'users': users}
    return render(request, 'blog_site/projects.html', context)

def singleproject(request, slug):
    q = Project.objects.filter(slug__iexact = slug)
    print(q)
    if q.exists(): 
        q = q.first()
    else:
        raise Http404('Project does not exist')
    context = {
        "q": q,
    }
    print('blog_site/'+q.html)
    return render(request, 'blog_site/'+q.html, context)

def sudoku(request):
    # Uncomment below for deployment
    # projects = Project.objects.all().order_by('-post_date')
    projects = Sudoku.objects.first()
    board_json = projects.board
    puzzle_title = projects.title
    puzzle_ruleset = projects.ruleset
    # paginator = Paginator(projects, 6)
    # page = request.GET.get('page')
    # projects = paginator.get_page(page)
    # try:
    #     users = paginator.page(page)
    # except PageNotAnInteger:
    #     users = paginator.page(1)
    # except EmptyPage:
    #     users = paginator.page(paginator.num_pages)
    context = {"puzzleJSON": board_json, "puzzleTitle": puzzle_title, "puzzleRules": puzzle_ruleset}
    return render(request, 'blog_site/base_sudoku.html', context)

def single_sudoku(request, id, slug):
    q = Sudoku.objects.filter(id = id)
    if q.exists(): 
        q = q.first()
    else:
        raise Http404('Sudoku does not exist')
    context = {
        "q": q,
    }
    return render(request, 'blog_site/base_sudoku.html', context)

@staff_member_required
def newsudoku(request):
    if request.method == "POST":
        new_sudoku = Sudoku(title = request.POST['title-entry'], ruleset = request.POST['ruleset'], board = request.POST['boardJSON'])
        slug = slugify(request.POST["title-entry"])
        new_sudoku.save()
        q = Sudoku.objects.filter(slug__iexact = slug)
        if q.exists():
            q = q.first()
        else:
            raise Http404("Sudoku does not exist")
        return redirect(single_sudoku, id = q.id, slug = q.slug)
    else:
        return render(request, 'blog_site/sudoku_submission.html')
    
def chess(request):
    context = {"success": "success"}
    return render(request, 'blog_site/base_chess.html', context)

def single_cheatsheet(request, slug):
    sections = CheatsheetSection.objects.filter(language = slug)
    if sections.exists(): 
        print("Cheatsheet found.")
    else:
        raise Http404('Cheatsheet does not exist.')
    context = {"type": sections.first().verbose, "sections": sections}
    return render(request, 'blog_site/base_cheatsheet.html', context)

def periodic_table(request):
    context = {}
    return render(request, 'blog_site/periodic_table.html', context)

def tv_license(request):
    context = {}
    return render(request, 'blog_site/tv_license.html', context)