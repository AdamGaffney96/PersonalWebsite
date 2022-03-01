from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('sudoku', views.sudoku, name = "sudoku"),
    path('sudoku/<slug>/<id>', views.single_sudoku, name = "single_sudoku"),
]