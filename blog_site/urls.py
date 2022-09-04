from django.urls import path, re_path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'home', views.homeView, 'home')
router.register(r'projects', views.projectsView, 'projects')

urlpatterns = [
    path('', views.home, name = "home"),
    path('sudoku', views.sudoku, name = "sudoku"),
    path('sudoku/submit', views.newsudoku, name = "sudoku_submit"),
    path('sudoku/<id>/<slug>', views.single_sudoku, name = "single_sudoku"),
    # path('chess', views.chess, name = "chess"),
    path('cheatsheets/<slug>', views.single_cheatsheet, name = "single_cheatsheet"),
    # path('periodic-table', views.periodic_table, name = "periodic_table"),
    # path('tv-license', views.tv_license, name = "tv_license"),
    path('projects', views.projects, name = "projects"),
    # path('projects/movie-project', views.movie_project, name = "movie_project"),
    # path('projects/countdown', views.countdown, name = "countdown"),
    # path('projects/password-gen', views.password_gen, name = 'password_gen'),
    path('api/', include(router.urls)),
]