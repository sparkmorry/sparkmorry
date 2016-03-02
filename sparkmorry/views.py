from django.shortcuts import render_to_response
from django.http import HttpResponse

def home(request):
	js='home'
	return render_to_response('demo.html', {'js': js})


def about(request):
	js='about'
	return render_to_response('about.html', {'js': js})