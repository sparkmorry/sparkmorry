# coding=utf-8
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist

from article.models import Article

def home(request):
	js='home'
	# return render_to_response('demo.html', {'page': js})
	return HttpResponseRedirect("/about/")


def about(request):
	js='about'
	return render_to_response('about.html', {'page': js})

def blog(request):
	js='blog'
	articles = Article.objects.filter(status=0)[0:15]
	return render_to_response('blog.html', {'page': js, 
		'articles':articles})

def article(request, article_id):
	js='article'
	try:
		article = Article.objects.get(id=article_id)
		return render_to_response('article.html', {'page': js, 
			'article':article})
	except ObjectDoesNotExist:
		return render_to_response('noarticle.html', {'page': js})

