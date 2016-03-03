# coding=utf-8
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import HttpResponseRedirect

def home(request):
	js='home'
	# return render_to_response('demo.html', {'page': js})
	return HttpResponseRedirect("/about/")


def about(request):
	js='about'
	return render_to_response('about.html', {'page': js})


def blog(request):
	js='blog'
	return render_to_response('blog.html', {'page': js})