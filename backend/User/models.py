from django.db import models
from enum import Enum
# Create your models here.

class UserType(models.IntegerChoices):
    ADMIN = 0
    USER = 1
    VENDOR = 2

class User(models.Model):
    user_id = models.AutoField(primary_key=True, db_index=True)
    user_name = models.CharField(max_length=50, blank=True, null=True)
    user_type = models.IntegerField(choices=UserType.choices)
    password = models.CharField(max_length=100, unique=True, blank=False, null=False)
    email = models.EmailField()

    def __str__(self):
        return self.user_name   

