from django.urls import path
from . import views

urlpatterns = [
    path("", views.display_html, name='display_html'),
    path("process/", views.process_id, name='process_id'),
    path("manual/", views.process_manual, name="process_manual"),
    path("react/", views.react, name="react"),
]
