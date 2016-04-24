# coding=utf-8
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist

from article.models import Article
from tag.models import TagArticleRelation, Tag

def home(request):
	return HttpResponseRedirect("/blog/")


def about(request):
	page='about'
	nav='about'
	return render_to_response('about.html', {'page': page, 
		'nav':nav})

def blog(request):
	page='blog'
	nav='blog'
	articles = Article.objects.filter(status=0).order_by('-id')[0:15]
	return render_to_response('blog.html', {'page': page, 
		'articles':articles, 'nav':nav})

def lab(request):
	page='lab'
	return render_to_response('lab.html', {'page': page})

def gallery(request):
	page='gallery'
	return render_to_response('gallery.html', {'page': page})

def tag(request, tag_id):
	page='tag'
	nav='blog'
	try:
		tag = Tag.objects.get(id=tag_id)
	except ObjectDoesNotExist:
		return render_to_response('noarticle.html', {'page': page, })
	
	records = TagArticleRelation.objects.filter(tag_id=tag_id)
	articles = []
	for record in records:
		articles.append(record.article)
	return render_to_response('tag.html', {'page': page, 
		'articles':articles, 'tag':tag, 'nav':nav})


def article(request, article_id):
	page='article'
	nav='blog'
	try:
		article = Article.objects.get(id=article_id)
		tag_relations = TagArticleRelation.objects.filter(article_id=article.id)
		return render_to_response('article.html', {'page': page, 
			'article':article, 'tag_list':tag_relations, 'nav':nav})
	except ObjectDoesNotExist:
		return render_to_response('noarticle.html', {'page': page, 'nav':nav})

