from django.urls import path
from . import views

urlpatterns = [
    path("prediction", views.process_id, name='process_id'),
]