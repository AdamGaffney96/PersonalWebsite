from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('sudoku', views.sudoku, name = "sudoku"),
    path('sudoku/submit', views.newsudoku, name = "sudoku_submit"),
    path('sudoku/<id>/<slug>', views.single_sudoku, name = "single_sudoku"),
    path('chess', views.chess, name = "chess"),
]