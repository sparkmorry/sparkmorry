# coding=utf-8
from django.db import models

# Create your models here.
from datetime import datetime

class Article(models.Model):
    title = models.CharField('标题', max_length=50)
    content = models.TextField('内容')
    ctime = models.DateTimeField('创建时间', max_length=30, auto_now_add=True)
    utime = models.DateTimeField('最新修改时间', max_length=30, auto_now=True)
    status = models.IntegerField('状态', default=0)
    # todo：标签

    class Meta:
        verbose_name = '文章'
        verbose_name_plural = '文章'

    def __unicode__(self):
        return self.title