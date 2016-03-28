from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from django.conf import settings


urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'sparkmorry.views.home',),
    url(r'^about/$', 'sparkmorry.views.about',),
    url(r'^blog/$', 'sparkmorry.views.blog',),
    url(r'^article/$', 'sparkmorry.views.article',),

    url(r'^admin/', include(admin.site.urls)),
)
