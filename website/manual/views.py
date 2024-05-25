from django.shortcuts import render
from django.http import HttpResponse
from manual.riotapi import get_prediction

def process_manual(request):
    """
    Process the manual input of 10 champions in 2 compositions.
    The view is used both to render the index.html and process input if there is any.

    Params:
        request: The HTTP request object.

    Returns:
        HttpResponse: The HTTP response object containing the rendered 'result.html' template.

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
        query = f"{top1},{jungle1},{mid1},{bot1},{supp1},{top2},{jungle2},{mid2},{bot2},{supp2}"
        result = get_prediction(query)
        return render(request, 'result.html', {'result': result})
    return render(request, 'index.html')
