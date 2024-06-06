from django.urls import path
from . import views

urlpatterns = [
    path("matchdata", views.matchdata, name='matchdata'),
    ]