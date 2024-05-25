from django.urls import path
from . import views

urlpatterns = [
    path("manual", views.process_manual, name="process_manual"),
]
