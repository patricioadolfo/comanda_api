from django.db import models

# Create your models here.
class Server(models.Model):

    nombre = models.CharField( max_length = 20, blank = False )

    ip = models.CharField( max_length = 30, null = False )

    puerto = models.IntegerField(null= False, default = 8080)

    usuario = models.CharField( max_length = 20, null = False, default= 'a' )

    contraseña = models.CharField( max_length= 20, null= False, default= 'aa' )
    
    def __str__(self,):

        return self.nombre
