from django.urls import path
from . import views

urlpatterns = [
    path('remove/<int:id>/<str:alias>', views.removeURL, name='removeURL'),
    path('evil/toggle/<int:id>', views.toggleEvil, name='toggleEvil'),
    path('evil/<int:id>', views.updateEvil, name='updateEvil'),
    path('shorten', views.shorten, name='shorten'),
    path('<str:alias>', views.redirect, name='redirect'),
]