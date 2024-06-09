import requests
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from displayStats.models import Accounts, Matches
from rest_framework import status


from . import match_data as md
from . import player_data as pd
import time


API_KEY =  'RGAPI-dc666358-d739-4739-92c3-4cfb15622ff0'


@api_view(['POST'])
def load_new_match_data(request):
    # replace with how we get the ID
    form_data = request.data
    gameName = form_data.get('gameName').strip()
    tagline = form_data.get('tagline').strip()

    puuid = md.get_puuid(gameName, tagline, API_KEY)
    amount = 20
    start = 0


    # update_past_matches(puuid)
    print("Successfully updated a user's data")
    print(gameName+"#"+tagline)
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
        pd.write_player_data(API_KEY, gameName, tagline)
    print("Successfully created a user's data")
    player_data = request.data
    gameName = player_data.get('gameName').strip()
    tagline = player_data.get('tagline').strip()

    data = Accounts.objects.get(riotID=str(gameName + "#" + tagline))

    sample_data = {'rank': [data.tier, data.rank, data.leaguePoints], 'wr': [data.wins, data.losses], 'sumId': data.summonerName,
                   'puuid': data.puuid, 'level': data.level, 'icon': data.icon}
    return Response(sample_data, status=status.HTTP_200_OK)


"""HELPER FUNCTIONS"""


def update_past_matches(puuid):
    start = 0
    amount = 100
    database_matches = Accounts.objects.get(puuid=puuid).past_matches
    while True:
        req = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start={start}&count={amount}&api_key={API_KEY}"
        matches = requests.get(req)
        # handle error (assume it is handled for now)
        matches = matches.json()
        if len(matches) == 0:
            break

        for match in matches:
            if match in database_matches:
                break
            database_matches.insert(0, match)
            if not Matches.objects.filter(match_id=match).exists():
                md.insert_matchdata_to_database(match, API_KEY)
        start += amount
    d = Accounts.objects.get(puuid=puuid)
    d.past_matches = database_matches.sort(reverse=True)
    d.save()

    print(f"Successfully updated the past matches for the player {puuid}")


def load_matches_from_database(start, riotID):
    wanted_ids = Accounts.objects.get(riotID=riotID).past_matches[start:start+20]
    to_put = []
    print(wanted_ids)
    for match_id in wanted_ids:
        try:
            to_put.append(Matches.objects.get(match_id=match_id).player_data)
        except:
            md.insert_matchdata_to_database(match_id, API_KEY)
            to_put.append(Matches.objects.get(match_id=match_id).player_data)
    return Response({"matches": to_put}, status=status.HTTP_200_OK)

    