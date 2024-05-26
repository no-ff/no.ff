from django.urls import path
from . import views

urlpatterns = [
    path("", views.process_id, name='process_id'),
    path("manual/", views.process_manual, name="process_manual"),
]
