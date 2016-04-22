# coding=utf-8
from django.contrib import admin

# Register your models here.
# -*- coding:utf-8 -*-
from django.db import models
from django import forms
from tag.models import Tag, TagArticleRelation


class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'ctime', 'utime')
    ordering = ('-ctime',)  # 降序
    readonly_fields = ('ctime',)

class TagArticleRelationAdmin(admin.ModelAdmin):
    list_display = ('id', 'article', 'tag', 'ctime', 'utime')
    ordering = ('-ctime',)  # 降序
    readonly_fields = ('ctime',)

admin.site.register(Tag, TagAdmin)
admin.site.register(TagArticleRelation, TagArticleRelationAdmin)
