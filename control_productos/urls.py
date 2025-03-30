from django.urls import path
from control_productos.views import control_productos
from control_productos.views import ControlarProductos

urlpatterns = [

    path('control_productos', control_productos, name= 'control_productos'),

    path('controlar_productos', ControlarProductos.as_view(), name= 'controlar_productos'),

]

