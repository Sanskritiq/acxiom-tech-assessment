from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('pdt', Product.as_view(), name='product'),
    path('category', CategoryAPI.as_view(), name='category'),
]
