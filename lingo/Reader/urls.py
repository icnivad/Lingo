from django.conf.urls.defaults import patterns, include, url

import views
# Uncomment the next two lines to enable the admin:

urlpatterns = patterns('',
    url(r'^$', views.Main, name='main'),
    url(r'^proxy$', views.Proxy, name='proxy'),
    url(r'^subproxy$', views.Subproxy, name='subproxy'),
)
