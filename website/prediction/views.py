from django.shortcuts import render
from django.http import HttpResponse

from prediction.riotapi import id_to_live_match_comp
from prediction.prediction_model.predictions import get_prediction

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import random

def percentage_predict(champions):
    if champions == "No account found" or champions == "No game found" or champions == 'Error in the prediction model':
        return "error"
    result = round(float(get_prediction(champions)),2)
    return [str(result), str(100 - result)]



@api_view(['POST'])
def react_process_manual(request):
    form_data = request.data
    top1 = form_data.get('top1')
    jungle1 = form_data.get('jungle1')
    mid1 = form_data.get('mid1')
    bot1 = form_data.get('bot1')
    supp1 = form_data.get('supp1')
    top2 = form_data.get('top2')
    jungle2 = form_data.get('jungle2')
    mid2 = form_data.get('mid2')
    bot2 = form_data.get('bot2')
    supp2 = form_data.get('supp2')
    
    champions = [top1, jungle1, mid1, bot1, supp1, top2, jungle2, mid2, bot2, supp2]
    
    return Response({"message": "Form processed successfully", "data": champions+ percentage_predict(champions)}, status=status.HTTP_200_OK)

@api_view(['POST'])
def react_process_id(request):
    form_data = request.data
    GameID = form_data.get('GameID')
    Tagline = form_data.get('Tagline')
    result = id_to_live_match_comp(GameID, Tagline)
    return Response({"message": "Check data if game not found or account not found", "data": result}, status=status.HTTP_200_OK)


def display_html(request):
    return render(request, 'input.html')


def process_id(request):
    """
    Process the given GameID and Tagline strings and return the result.
    The view is used both to render the index.html and process input if there is any.
    """
    if request.method == 'POST':
        GameID = request.POST.get('GameID')
        Tagline = request.POST.get('Tagline')
        # Process the strings here (for example, concatenation)
        result = str(id_to_live_match_comp(GameID, Tagline))
        return render(request, 'result.html', {'result': result})



def process_manual(request):
    """
    Process the manual input of 10 champions in 2 compositions.
    """
    if request.method == 'POST':
        top1 = request.POST.get('top1')
        jungle1 = request.POST.get('jungle1')
        mid1 = request.POST.get('mid1')
        bot1 = request.POST.get('bot1')
        supp1 = request.POST.get('supp1')
        top2 = request.POST.get('top2')
        jungle2 = request.POST.get('jungle2')
        mid2 = request.POST.get('mid2')
        bot2 = request.POST.get('bot2')
        supp2 = request.POST.get('supp2')
        champions = [top1, jungle1, mid1, bot1, supp1, top2, jungle2, mid2, bot2, supp2]
        return percentage_display(request, champions )


def percentage_display(request, champions):
    #handles no found case
    if champions == "No account found" or champions == "No game found":
        return render(request, "error.html", {"result":champions})
    
    #gets percentage and rounds to 2 digits
    query = f"{champions[0]},{champions[1]},{champions[2]},{champions[3]},{champions[4]},{champions[5]},{champions[6]},{champions[7]},{champions[8]},{champions[9]}"
    result = round(get_prediction(query),2)

    return render(request, 'result.html', {"result": result,
                                           "result2": (100 - result),
                                            "t1c1": champions[0],
                                            "t1c2": champions[1],
                                            "t1c3": champions[2],
                                            "t1c4": champions[3],
                                            "t1c5": champions[4],
                                            "t2c1": champions[5],
                                            "t2c2": champions[6],
                                            "t2c3": champions[7],
                                            "t2c4": champions[8],
                                            "t2c5": champions[9]})





def react(request):
    return render(request, "index.html")