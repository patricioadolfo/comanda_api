from django.contrib import admin
from server.models import Server
# Register your models here.

@admin.register(Server)
class ServerAdmin(admin.ModelAdmin):

    list_display = ( 'nombre', 'ip' )

    list_display_links = ('nombre',)

    fieldsets = [
        ('Server', 
         
         {'fields': ['nombre',]}, 
          
          ),

        ('Datos Generales',
           
          {'fields': ['ip', 'puerto',]}, 
          
          ),
        
        ('Usuario y contraseña',
        
          {'fields': ['usuario', 'contraseña']},
        
          ),

        ('Estado',
        
          {'fields': ['estado',]},
        
          ),
    
    ]