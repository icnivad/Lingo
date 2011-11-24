from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template import Context, Template, loader
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
import simplejson
from django.template import RequestContext
import models
from django.conf import settings
import datetime
import urllib2
from BeautifulSoup import BeautifulSoup

def Main(request):
	return render(request, 'main.html', {})

def Proxy(request):
	fetch=request.GET['mediate_uri']
	response=urllib2.urlopen(fetch)
	data=response.read()
	soup=BeautifulSoup(data)
	chartype=soup.originalEncoding
	return HttpResponse(data, mimetype="text/html; charset="+chartype)
	
def Subproxy(request):
	fetch=request.GET['mediate_uri']
	response=urllib2.urlopen(fetch)
	return HttpResponse(response.read())