from . import match_data as md

from django.http import HttpResponse
def matchdata(request):
    matchID = "NA1_4985907729"
    api = 'RGAPI-61b2aecf-da19-4d68-b273-bae69dd6a000'
    match = md.convert_match_to_player_data(matchID, api)
    return HttpResponse(match['NA1_4985907729'][0]['username'])

