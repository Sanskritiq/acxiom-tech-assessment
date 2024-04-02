from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('signup', Authentication.as_view(), name='signup'),
]
