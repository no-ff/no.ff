from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from displayStats.models import Accounts
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

    flag = False #exists to check whether or not we have found a match that is already in the database
    while not flag:
        req = f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?queue=420&start={start}&count={amount}&api_key={api_key}"  
        matches = requests.get(req)
        if md.handle_riot_api_error(matches):
            #for now suppose the errors are handled
            #this is extremely annoying
            pass
        matches = matches.json()
        database_matches = Accounts.objects.get(puuid=puuid).past_matches
        if not database_matches:
            database_matches = []
        for match in matches:
            if match in database_matches:
                flag = True
                matches = matches[:matches.index(match)]
                break
            flag = True
            md.insert_matchdata_to_database(match, api_key)

        start = start + amount
    

    return Response({"message": "Match data loaded successfully"}, status=status.HTTP_200_OK)

    # if any of the matches are already in the database, keep everything up to that point
    # otherwise, get all the matches, and save the match datato database
    # now call get 20 more matches, but starting in 20
    # repeat until we finally find a match that is already in the database

@api_view(['POST'])
def load_old_match_data(request):
    """
    """
    #replace with how we get the ID
    name = request.name
    tagline = request.tagline

    puuid = md.get_puuid(name, tagline)

    matches = md.get_matchlist_by_puuid(puuid, 20)
    # if any of the matches are already in the database, keep everything up to that point
    # otherwise, get all the matches, and save the match datato database
    # now call get 20 more matches, but starting in 20
    # repeat until we finally find a match that is already in the database