from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from displayStats.models import Accounts, Matches
from rest_framework import status


from . import match_data as md
from. import player_data as pd

import requests
import json


def matchdata(request):
    matchID = "NA1_4985907729"
    api = ''
    match = md.convert_match_to_player_data(matchID, api)
    return HttpResponse(match['NA1_4985907729'][0]['username'])


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
        add_20_to_database(puuid, start, amount, api_key)

    flag = False #exists to check whether or not we have found a match that is already in the database
    while not flag:
        flag = add_20_to_database(puuid, start, amount, api_key)
        start = start + amount
    print("Successfully updated a user's data")


def add_20_to_database(puuid, start, amount, api_key):
    flag = False
    req = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start={start}&count={amount}&api_key={api_key}"  
    matches = requests.get(req)

    if md.handle_riot_api_error(matches):
        return Response({"message": matches.status_code}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    matches = matches.json()
    print(matches)
    database_matches = Accounts.objects.get(puuid=puuid).past_matches

    if not database_matches or database_matches == None: # checks if user has ever ini
        database_matches = []
    for match in matches:
        if match in database_matches:
            flag = True
            break
        database_matches.insert(0,match)
        if not Matches.objects.filter(match_id=match).exists():
            md.insert_matchdata_to_database(match, api_key)

    # Saves the updated past_matches
    d = Accounts.objects.get(puuid=puuid)
    d.past_matches = database_matches
    d.save()
    print(f"Successfully updated the past matches for the player {puuid}")
    return flag

@api_view(['POST'])
def load_old_match_data(request, api_key):
    #need to count how many matches are loaded before loading more, then find the next 20 to load from the db
    loaded_data = request.counter -1
    player_matches = Accounts.objects.get(request.riotID).past_matches
    add_matches = player_matches[loaded_data:loaded_data+20]
    for match in add_matches:
        if not Matches.objects.filter(match_id=match).exists():
            md.insert_matchdata_to_database(match, api_key)
    


@api_view(['POST'])
def load_matches(request):
    pass

def load_matches_from_database(start, end, puuid):
    wanted_ids = Accounts.objects.get(puuid=puuid).past_matches[start: end + 1]
    to_put = []
    for match_id in wanted_ids:
        to_put.append(Matches.objects.get(match_id=match_id).player_data)
    return Response({"matches": to_put}, status=status.HTTP_200_OK)
