from django.contrib import admin
from alerta.models import Alerta

# Register your models here.

@admin.register(Alerta)
class AlertaAdmin(admin.ModelAdmin):

    list_display = ( 'nombre', 'server', 'tiempo' )

    list_display_links = ('nombre',)

    fieldsets = [
        
        ('Alerta', 
         
         {'fields': ['nombre', 'server', 'centro_emision' ,'comanda' ,'control_producto','tiempo', 'sonido']}, 
          
          ),

    ]
