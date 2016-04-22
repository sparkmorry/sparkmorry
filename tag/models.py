# coding=utf-8
from django.db import models
from article.models import Article
from datetime import datetime
class Tag(models.Model):
    name = models.CharField('标签名称', max_length=20)
    ctime = models.DateTimeField('创建时间', max_length=30, auto_now_add=True)
    utime = models.DateTimeField('最新修改时间', max_length=30, auto_now=True)
    status = models.IntegerField('状态', default=0)

    class Meta:
        verbose_name = '标签'
        verbose_name_plural = '标签'

    def __unicode__(self):
        return self.name

class TagArticleRelation(models.Model):
    tag = models.ForeignKey(Tag, verbose_name="关联标签")
    article = models.ForeignKey(Article, verbose_name="关联文章")
    ctime = models.DateTimeField('创建时间', max_length=30, auto_now_add=True)
    utime = models.DateTimeField('最新修改时间', max_length=30, auto_now=True)
    status = models.IntegerField('状态', default=0)

    class Meta:
        verbose_name = '标签文章关系'
        verbose_name_plural = '标签文章关系'

    def __unicode__(self):
        return unicode(self.tag_id)