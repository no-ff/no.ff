from django.urls import path
from . import views

urlpatterns = [
    path("", views.display_html, name='display_html'),
    path("process/", views.process_id, name='process_id'),
    path("manual/", views.process_manual, name="process_manual"),
    path("react/", views.react, name="react"),
    path('api/process-manual/', views.react_process_manual, name='react_process_manual'),
    path('api/process-id/', views.react_process_id, name='react_process_id'),
]
