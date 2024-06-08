from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from displayStats.models import Accounts, Matches
from rest_framework import status


from . import match_data as md
from. import player_data as pd

import requests

@api_view(['POST'])
def load_new_match_data(request, api_key = 'RGAPI-f0816f16-3444-43d2-80d2-166c6e9a4a77'):
    #replace with how we get the ID
    form_data = request.data
    gameName = form_data.get('gameName').strip()
    tagline = form_data.get('tagline').strip()

    puuid = md.get_puuid(gameName, tagline, api_key)
    amount = 20
    start = 0

    if not Accounts.objects.filter(puuid=puuid).exists():
        pd.write_player_data(api_key, gameName, tagline)
    update_past_matches(puuid, start, amount, api_key)
    print("Successfully updated a user's data")


def update_past_matches(puuid, api_key):
    start = 0
    amount = 100
    database_matches = Accounts.objects.get(puuid=puuid).past_matches
    while True:
        req = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start={start}&count={amount}&api_key={api_key}"  
        matches = requests.get(req)
        # handle error (assume it is handled for now)
        matches = matches.json(); print(matches)
        if len(matches) == 0: break

        for match in matches:
            if match in database_matches: break
            database_matches.insert(0,match)
            if not Matches.objects.filter(match_id=match).exists():
                md.insert_matchdata_to_database(match, api_key)
        start += amount
    d = Accounts.objects.get(puuid=puuid)
    d.past_matches = database_matches.sort(reverse=True)
    d.save()  

    print(f"Successfully updated the past matches for the player {puuid}")


@api_view(['POST'])
def load_old_match_data(request, api_key):
    #need to count how many matches are loaded before loading more, then find the next 20 to load from the db
    loaded_data = request.counter -1
    player_matches = Accounts.objects.get(request.riotID).past_matches
    if (not player_matches):
        return 
    add_matches = player_matches[loaded_data:loaded_data+20]
    for match in add_matches:
        if not Matches.objects.filter(match_id=match).exists():
            md.insert_matchdata_to_database(match, api_key)


def load_matches_from_database(start, end, puuid, api_key):
    wanted_ids = Accounts.objects.get(puuid=puuid).past_matches[start: end + 1]
    to_put = []
    print(wanted_ids)
    print(start, end)
    for match_id in wanted_ids:
        try:
            to_put.append(Matches.objects.get(match_id=match_id).player_data)
        except:
            md.insert_matchdata_to_database(match_id, api_key)
            to_put.append(Matches.objects.get(match_id=match_id).player_data)
    return Response({"matches": to_put}, status=status.HTTP_200_OK)


@api_view(['POST'])
def load_player_data(request):
    if not Accounts.objects.filter(riotID=str(gameName + "#" + tagline)).exists():
        pd.write_player_data(gameName, tagline)
    player_data = request.data
    gameName = player_data.get('gameName').strip()
    tagline = player_data.get('tagline').strip()

    print(player_data)
    data = Accounts.objects.get(riotID=str(gameName + "#" + tagline))
    print(data)

    sample_data = {'rank': [data.tier, data.rank, data.leaguePoints], 'wr': [data.wins, data.losses], 'sumId': data.summonerName,
                    'puuid': data.puuid, 'level': data.level, 'icon': data.icon}
    return Response(sample_data, status=status.HTTP_200_OK)
