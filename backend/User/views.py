from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
import datetime
from argon2 import PasswordHasher
from acxiomBackend.settings import COOKIE_KEY
import jwt

from .models import User
from .utility import Autherize
ph = PasswordHasher()


# Create your views here.
class Authentication(APIView):
    # register api
    def put(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]
            username = request.data["username"]
            role = request.data["role"]
        except KeyError:
            return JsonResponse(
                {"msg": "Missing data."}, status=status.HTTP_400_BAD_REQUEST
            )

        if role not in ["user", "vendor"]:
            return JsonResponse(
                {"msg": "Invalid Role."}, status=status.HTTP_400_BAD_REQUEST
            )
        if role == "vendor":
            role = 2
        else:
            role = 1

        existing_user = User.objects.filter(email=email)
        if existing_user:
            return JsonResponse(
                {"msg": "User with same email id already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        password = ph.hash(password)
        user = User.objects.create(
            email=email, password=password, user_name=username, user_type=role
        )
        user.save()

        return JsonResponse({"msg": "User created"}, status=status.HTTP_201_CREATED)

    # login api
    def post(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]
        except KeyError:
            return JsonResponse(
                {"msg": "Missing data."}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email)
        if not user:
            return JsonResponse(
                {"msg": "User does not exist."}, status=status.HTTP_404_NOT_FOUND
            )


        verified = False
        try:
            if ph.verify(user[0].password, password):
                verified = True
        except Exception as e:
            pass

        if not verified:
            return JsonResponse(
                {"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
        
        payload = {
            "id": user[0].user_id,
            "iat": datetime.datetime.now(datetime.timezone.utc),
            "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=60*60)
        }

        token = jwt.encode(payload, COOKIE_KEY, algorithm="HS256")
        response =  JsonResponse({"msg": "User verified"}, status=status.HTTP_200_OK)
        response.set_cookie("token", token)

        return response
    

    # logout api
    def delete(self, request):
        response = JsonResponse({"msg": "User logged out"}, status=status.HTTP_200_OK)
        response.delete_cookie("token")
        return response
    
    @Autherize()
    def get(self, request, **kwargs):
        user = kwargs["user"]
        return JsonResponse({
            "msg": "User details",
            "user_id": user.user_id,
            "user_name": user.user_name,
            "email": user.email,
            "user_type": user.user_type
        }, status=status.HTTP_200_OK)

class GuestAPI(APIView):
    
    @Autherize(1)
    def post(self, request, **kwargs):
        pass