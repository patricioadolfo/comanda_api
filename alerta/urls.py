from django.urls import path
from alerta.views import comanda
from alerta.views import VerComanda

urlpatterns = [

    path('comanda', comanda, name= 'index'),

    path('ver_comanda', VerComanda.as_view(), name= 'ver_comanda'),

]

