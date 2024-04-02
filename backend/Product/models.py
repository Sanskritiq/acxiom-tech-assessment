from django.db import models
from User.models import User

# Create your models here.
class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True, db_index=True, null=False, blank=False)
    icon = models.ImageField(upload_to='category', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ProductType(models.IntegerChoices):
    SERVICE = 0
    PRODUCT = 1

class Product(models.Model):
    id = models.AutoField(primary_key=True, db_index=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    type = models.IntegerField(choices=ProductType.choices, default=ProductType.PRODUCT)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)
    stock = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
class OrderStatus(models.IntegerChoices):
    INCART = 0
    INPROCESS = 1
    ACCEPTED = 2
    REJECTED = 3
    DELIVERED = 4

class Order(models.Model):
    id = models.AutoField(primary_key=True, db_index=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vendor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vendor')
    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order_status = models.IntegerField(choices=OrderStatus.choices, default=OrderStatus.INCART)

    def __str__(self):
        return self.product.name

