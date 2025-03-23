from django.urls import path
from alerta.views import index
from alerta.views import VerComanda

urlpatterns = [

    path('', index, name= 'index'),

    path('ver_comanda', VerComanda.as_view(), name= 'ver_comanda'),

]