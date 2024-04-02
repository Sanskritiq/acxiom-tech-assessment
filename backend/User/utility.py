from typing import Any
import jwt
from django.http import JsonResponse
from acxiomBackend.settings import COOKIE_KEY
from .models import User


class Autherize:
    """
    Authorization decorator class.

    Attributes:
        mode (int): Mode of the decorator.

    Methods:
        __init__(self, mode): Initializes the Autherize instance.
        __call__(self, func): Decorator method to authorize the function.
    """

    def __init__(self, mode=3) -> None:
        """
        Initializes the Autherize instance.

        Args:
            mode (int): Mode of the decorator.
        """
        self.mode = mode

    def __call__(self, func) -> Any:
        """
        Decorator method to authorize the function.

        Args:
            func: Function to be authorized.

        Returns:
            Any: Result of the function call or error response.

        Raises:
            jwt.ExpiredSignatureError: If the token is expired.
        """
        def wrapper(*args, **kwargs):
            request = args[1]
            token = request.COOKIES.get('token')
            if not token:
                return JsonResponse({"msg": "You are unauthenticated. Please log in first."}, status=401)

            try:
                payload = jwt.decode(token, COOKIE_KEY, algorithms='HS256')
            except jwt.ExpiredSignatureError:
                return JsonResponse({"msg": "Your token is expired. Please login again."}, status=409)
            except Exception as e:
                return JsonResponse({"msg": "Invalid token."}, status=401)

            user = User.objects.get(user_id=payload["id"])

            if not user:
                return JsonResponse({"msg": "User not found."}, status=404)

            if self.mode != 3 and self.mode != user.user_type:
                return JsonResponse({"msg": "You are not authorized to access this resource."}, status=403)

            kwargs["user"] = user

            return func(*args, **kwargs)
        return wrapper