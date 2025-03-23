from django.db import models
from server.models import Server

class Alerta(models.Model):

    nombre = models.CharField( max_length = 20, blank = False )

    server = models.ForeignKey( Server, on_delete= models.CASCADE, null= False )

    tiempo = models.IntegerField(null= False, default = 3)

    sonido = models.FileField(upload_to= "media/sonido", null= True)

    def __str__(self,):

        return self.nombre