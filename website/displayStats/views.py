import requests
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from displayStats.models import Accounts, Matches
from rest_framework import status

from . import match_data as md
from . import player_data as pd

API_KEY = 'RGAPI-eedfcc15-9a25-4b68-8f71-7cc6b7aa32af'

@api_view(['POST'])
def load_new_match_data(request):
    # replace with how we get the ID
    form_data = request.data
    gameName = form_data.get('gameName')
    tagline = form_data.get('tagline')
    puuid = md.get_puuid(gameName, tagline, API_KEY)
    print("Username:", gameName+"#"+tagline)
    print("Puuid:", puuid)
    update_past_matches(puuid)
    print("Successfully updated a user's data")
    data = load_matches_from_database(0, gameName+"#"+tagline)
    return data


@api_view(['POST'])
def load_old_match_data(request):
    # need to count how many matches are loaded before loading more, then find the next 20 to load from the db
    form_data = request.data
    gameName = form_data.get('gameName').strip()
    tagline = form_data.get('tagline').strip()
    loaded_data = form_data.get('loaded').strip()
    riotID = gameName + "#" + tagline

    return load_matches_from_database(loaded_data, riotID)


@api_view(['POST'])
def load_player_data(request):
    gameName = request.data.get('gameName')
    tagline = request.data.get('tagline')
    print(gameName, tagline)
    if not Accounts.objects.filter(riotID=str(gameName + "#" + tagline)).exists():
        print("This is a new user!!!!!")
        pd.write_player_data(API_KEY, gameName, tagline)
        print("Successfully created a user's data")
    else:
        print("This user already exists in database")
    
    data = Accounts.objects.get(riotID=str(gameName + "#" + tagline))

    sample_data = {'gameName': gameName, 'tagline': tagline, 'rank': [data.tier, data.rank, data.leaguePoints], 'wr': [data.wins, data.losses], 'sumId': data.summonerName,
                   'puuid': data.puuid, 'level': data.level, 'icon': data.icon}
    return Response(sample_data, status=status.HTTP_200_OK)


@api_view(['POST'])
def show_more_matches(request):
    receiving_data = request.data
    data = load_matches_from_database(
        receiving_data.get('length'), receiving_data.get('riotID'))
    print(data)
    return data


"""HELPER FUNCTIONS"""
def update_past_matches(puuid):
    start = 0
    amount = 100
    database_row = Accounts.objects.get(puuid=puuid)
    database_matches = database_row.past_matches
    newer_matches = pd.get_match_list(puuid, API_KEY)
    new = sorted(list(set(database_matches + newer_matches)), reverse=True)
    database_row.past_matches = new
    database_row.save()

    print(f"Successfully updated the past matches for the player {puuid}")


def load_matches_from_database(start, riotID):
    wanted_ids = Accounts.objects.get(
        riotID=riotID).past_matches[start:start+20]
    to_put = []
    print(wanted_ids)
    for match_id in wanted_ids:
        try:
            to_put.append(Matches.objects.get(match_id=match_id).player_data)
        except:
            md.insert_matchdata_to_database(match_id, API_KEY)
            to_put.append(Matches.objects.get(match_id=match_id).player_data)
    print(to_put)
    return Response({"matches": to_put}, status=status.HTTP_200_OK)
