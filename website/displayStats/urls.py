from django.urls import path
from . import views

urlpatterns = [
    path("matchdata", views.matchdata, name='matchdata'),
    path("add_new_matches/", views.load_new_match_data, name='load_new_match_data'),
    path("load_player_data/", views.load_player_data, name='load_player_data'),
    ]
