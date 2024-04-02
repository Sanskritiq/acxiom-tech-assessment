from rest_framework import status
from rest_framework.views import APIView
from django.http import JsonResponse
from django.core.paginator import Paginator
from User.utility import Autherize
from .models import Product as ProductModel, Category as CategoryModel, Order as OrderModel

# Create your views here.


class Product(APIView):

    # add product api
    @Autherize(2)
    def put(self, request, **kwargs):
        try:
            name = request.data["name"]
            price = float(request.data["price"])
            description = request.data["description"]
            category = request.data["category"]
            pdt_type = request.data["type"]
        except KeyError:
            return JsonResponse(
                {"msg": "Missing data."}, status=status.HTTP_400_BAD_REQUEST
            )

        if pdt_type not in ["product", "service"]:
            return JsonResponse(
                {"msg": "Invalid Type."}, status=status.HTTP_400_BAD_REQUEST
            )

        if pdt_type == "product":
            pdt_type = 1
        else:
            pdt_type = 0

        category = CategoryModel.objects.filter(name=category)
        if not category or len(category) != 1:
            return JsonResponse(
                {"msg": "Invalid Category."}, status=status.HTTP_400_BAD_REQUEST
            )
        category = category[0]

        vendor = kwargs["user"]
        product = ProductModel.objects.create(
            name=name,
            price=price,
            description=description,
            category=category,
            type=pdt_type,
            vendor=vendor,
        )
        product.save()
        return JsonResponse({"msg": "Product added"}, status=status.HTTP_201_CREATED)

    #update product
    @Autherize(2)
    def post(self, request, **kwargs):
        try:
            product_id = request.data["id"]
            name = request.data["name"]
            price = float(request.data["price"])
            description = request.data["description"]
            category = request.data["category"]
            pdt_type = request.data["type"]
        except KeyError:
            return JsonResponse(
                {"msg": "Missing data."}, status=status.HTTP_400_BAD_REQUEST
            )

        if pdt_type not in ["product", "service"]:
            return JsonResponse(
                {"msg": "Invalid Type."}, status=status.HTTP_400_BAD_REQUEST
            )

        if pdt_type == "product":
            pdt_type = 1
        else:
            pdt_type = 0

        category = CategoryModel.objects.filter(name=category)
        if not category or len(category) != 1:
            return JsonResponse(
                {"msg": "Invalid Category."}, status=status.HTTP_400_BAD_REQUEST
            )
        category = category[0]

        vendor = kwargs["user"]
        product = ProductModel.objects.filter(id=product_id, vendor=vendor)
        if not product or len(product) != 1:
            return JsonResponse(
                {"msg": "Invalid Product."}, status=status.HTTP_400_BAD_REQUEST
            )

        product.name = name
        product.price = price
        product.description = description
        product.category = category
        product.type = pdt_type
        product.save()
        return JsonResponse({"msg": "Product updated"}, status=status.HTTP_200_OK)
    
    @Autherize()
    def get(self, request, **kwargs):
        user = kwargs["user"]

        if user.user_type == 2:
            products = ProductModel.objects.filter(vendor=user)
            page = request.GET.get("page", 1)
            limit = request.GET.get("limit", 50)
        elif user.user_type == 1:
            category = request.GET.get("category", None)
            page = request.GET.get("page", 1)
            limit = request.GET.get("limit", 50)
            if category:
                products = ProductModel.objects.filter(category__name=category)
            else:
                products = ProductModel.objects.all()
            
        paginator = Paginator(products, limit)
        page_obj = paginator.get_page(page)
        data = [
            {
                "id": product.id,
                "name": product.name,
                "price": product.price,
                "description": product.description,
                "image": product.image.url if product.image else None,
                "category": product.category.name,
                "vendor": product.vendor.user_name,
                "stock": product.stock,
            }
            for product in page_obj
        ]

        return JsonResponse(data, safe=False, status=status.HTTP_200_OK)

    
    @Autherize(2)
    def delete(self, request, **kwargs):
        try:
            product_id = request.data["id"]
        except KeyError:
            return JsonResponse(
                {"msg": "Missing data."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        product = ProductModel.objects.filter(id=product_id, vendor=kwargs["user"])
        if not product or len(product) != 1:
            return JsonResponse(
                {"msg": "Invalid Product."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        product = product[0]
        product.delete()
        return JsonResponse({"msg": "Product Deleted"}, status=status.HTTP_200_OK)
    


class CategoryAPI(APIView):

    # get all categories api
    @Autherize()
    def get(self, request, **kwargs):
        categories = CategoryModel.objects.all()
        data = [
            {
                "id": category.id,
                "name": category.name,
                "description": category.description,
                "icon": category.icon.url if category.icon else None,
            }
            for category in categories
        ]
        return JsonResponse(data, safe=False, status=status.HTTP_200_OK)

class OrderAPI(APIView):

    ## Add to cart api
    @Autherize(1)
    def put(self, request, **kwargs):
        try:
            product_id = request.data["product_id"]
            quantity = request.data["quantity"]
        except KeyError:
            return JsonResponse(
                {"msg": "Missing data."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        product = ProductModel.objects.filter(id=product_id)
        if not product or len(product) != 1:
            return JsonResponse(
                {"msg": "Invalid Product."}, status=status.HTTP_400_BAD_REQUEST
            )
        product = product[0]

        user = kwargs["user"]
        order = OrderModel.objects.create(
            product=product,
            user=user,
            quantity=quantity,
            vendor=product.vendor,
            total_price=product.price * quantity
        )
        order.save()
        return JsonResponse({"msg": "Order Placed"}, status=status.HTTP_201_CREATED)
    
    ## Place order api
    @Autherize(1)
    def post(self, request, **kwargs):
        user = kwargs["user"]

        orders = OrderModel.objects.filter(user=user, order_status=0)
        if not orders or len(orders) < 1:
            return JsonResponse(
                {"msg": "No orders in cart."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        for order in orders:
            if order.product.stock < order.quantity:
                return JsonResponse(
                    {"msg": "Product out of stock.", "pdt" : order.product.name}, status=status.HTTP_400_BAD_REQUEST
                )
        
        for order in orders:
            order.order_status = 1
            order.save()
            order.product.stock -= order.quantity
            order.product.save()

        return JsonResponse({"msg": "Order Placed"}, status=status.HTTP_200_OK)
    

    ## Delete order api
    @Autherize(1)
    def delete(self, request, **kwargs):
        try:
            order_id = request.data["order_id"]
        except KeyError:
            return JsonResponse(
                {"msg": "Missing data."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        order = OrderModel.objects.filter(id=order_id, user=kwargs["user"])
        if not order or len(order) != 1:
            return JsonResponse(
                {"msg": "Invalid Order."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        order = order[0]
        order.delete()
        return JsonResponse({"msg": "Order Deleted"}, status=status.HTTP_200_OK)
    
    
class OrderManagerment(APIView):

    ## Get orders api
    @Autherize(2)
    def get(self, request, **kwargs):
        vendor = kwargs["user"]
        page = request.GET.get("page", 1)
        limit = request.GET.get("limit", 50)
        orders = OrderModel.objects.filter(vendor=vendor)
        paginator = Paginator(orders, limit)
        page_obj = paginator.get_page(page)        

        data = [
            {
                "id": order.id,
                "product": order.product.name,
                "user": order.user.user_name,
                "quantity": order.quantity,
                "total_price": order.total_price,
                "order_status": order.order_status,
            }
            for order in page_obj
        ]
        return JsonResponse(data, safe=False, status=status.HTTP_200_OK)

    ## Update order status api
    @Autherize(2)
    def post(self, request, **kwargs):
        try:
            order_id = request.data["order_id"]
            status = request.data["status"]
        except KeyError:
            return JsonResponse(
                {"msg": "Missing data."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        order = OrderModel.objects.filter(id=order_id, vendor=kwargs["user"])
        if not order or len(order) != 1:
            return JsonResponse(
                {"msg": "Invalid Order."}, status=status.HTTP_400_BAD_REQUEST
            )
        order = order[0]

        if status not in [2, 3, 4]:
            return JsonResponse(
                {"msg": "Invalid Status."}, status=status.HTTP_400_BAD_REQUEST
            )
        
        order.order_status = status
        order.save()
        return JsonResponse({"msg": "Order Updated"}, status=status.HTTP_200_OK)
