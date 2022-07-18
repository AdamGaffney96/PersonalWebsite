from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('sudoku', views.sudoku, name = "sudoku"),
    path('sudoku/submit', views.newsudoku, name = "sudoku_submit"),
    path('sudoku/<id>/<slug>', views.single_sudoku, name = "single_sudoku"),
    path('chess', views.chess, name = "chess"),
    path('cheatsheets/<slug>', views.single_cheatsheet, name = "single_cheatsheet"),
    path('periodic-table', views.periodic_table, name = "periodic_table"),
    path('tv-license', views.tv_license, name = "tv_license"),
    path('projects', views.projects, name = "projects"),
    path('projects/movie-project', views.movie_project, name = "movie_project"),
    path('projects/countdown', views.countdown, name = "countdown"),
    path('projects/password-gen', views.password_gen, name = 'password_gen'),
]