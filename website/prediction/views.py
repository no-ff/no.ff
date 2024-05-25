from django.shortcuts import render
from django.http import HttpResponse
from prediction.riotapi import id_to_live_match_comp

def process_id(request):
    """
    Process the given GameID and Tagline strings and return the result.
    The view is used both to render the index.html and process input if there is any.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        HttpResponse: The HTTP response object containing the rendered 'result.html' template.

    """
    if request.method == 'POST':
        GameID = request.POST.get('GameID')
        Tagline = request.POST.get('Tagline')
        # Process the strings here (for example, concatenation)
        result = str(id_to_live_match_comp(GameID, Tagline))
        return render(request, 'result.html', {'result': result})
    return render(request, 'index.html')





