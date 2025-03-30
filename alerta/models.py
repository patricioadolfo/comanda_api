from django.db import models
from server.models import Server

class Alerta(models.Model):

    nombre = models.CharField( max_length = 20, blank = False )

    server = models.ForeignKey( Server, on_delete = models.CASCADE, null = False )

    centro_emision = models.CharField( max_length = 4, default = '0055' )

    tiempo = models.IntegerField(null = False, default = 3)

    sonido = models.FileField(upload_to = "sonido", null = True)

    comanda = models.BooleanField(default = False )

    control_producto = models.BooleanField(default = False )

    def __str__(self,):

        return self.nombre