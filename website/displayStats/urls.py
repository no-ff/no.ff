from django.urls import path
from . import views

urlpatterns = [
    path("add_new_matches/", views.load_new_match_data, name='load_new_match_data'),
    path("load_player_data/", views.load_player_data, name='load_player_data'),
    path("load_old_matches/", views.load_old_match_data, name='load_old_match_data'),
    path("show_more_matches/", views.show_more_matches, name='show_more_matches'),
]
