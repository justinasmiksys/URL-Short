from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    force_url = models.CharField(max_length=256)
    evil_mode = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Link(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    target_url = models.CharField(max_length=256)
    alias = models.CharField(max_length=50)

class Visit(models.Model):
    link = models.ForeignKey(Link, on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=20)
    date_created = models.DateTimeField(auto_now_add=True)

# class Note(models.Model):
#     body = models.TextField()
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)