from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("patrick", views.greet_patrick, name="greet_patrick")
]