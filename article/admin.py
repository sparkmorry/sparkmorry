# coding=utf-8
from django.contrib import admin

# Register your models here.
# -*- coding:utf-8 -*-
from django.db import models
from django import forms
from article.models import Article


class ArticleAdmin(admin.ModelAdmin):
    formfield_overrides = {models.TextField: {'widget': forms.Textarea(attrs={'class': 'ckeditor'})}, }
    list_display = ('id', 'title', 'ctime', 'utime')
    ordering = ('-ctime',)  # 降序
    readonly_fields = ('ctime',)

    class Media:
        js = ('ckeditor/configuration-ckeditor.js', 'ckeditor/ckeditor.js')

admin.site.register(Article, ArticleAdmin)
