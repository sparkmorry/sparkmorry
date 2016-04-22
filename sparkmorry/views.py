# coding=utf-8
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist

from article.models import Article
from tag.models import TagArticleRelation

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

def lab(request):
	page='lab'
	return render_to_response('lab.html', {'page': page})

def gallery(request):
	page='gallery'
	return render_to_response('gallery.html', {'page': page})

def tag(request, tag_id):
	page='tag'
	return render_to_response('tag.html', {'page': page})


def article(request, article_id):
	js='article'
	try:
		article = Article.objects.get(id=article_id)
		tag_relations = TagArticleRelation.objects.filter(article_id=article.id)
		return render_to_response('article.html', {'page': js, 
			'article':article, 'tag_list':tag_relations})
	except ObjectDoesNotExist:
		return render_to_response('noarticle.html', {'page': js})

