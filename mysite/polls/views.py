from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("hello world.")


def greet_patrick(request):
    return HttpResponse("hello patrick")