from django.shortcuts import render
from alerta.models import Alerta
from api.models import Api_Server
from django.views.generic import View
import json
from django.http import HttpResponse
# Create your views here.

def control_productos(request,):

    global alerta

    alerta = Alerta.objects.get ( control_producto = True )

    global api
    
    api =  Api_Server( alerta.server )

    api.obtener_token()

    return render(request, 'control_productos/control_productos.html', {'sonido': alerta.sonido })

class ControlarProductos(View):

    def is_ajax(self, request):
         
        return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

    def get(self, request):

        results= {}
        
        if self.is_ajax( request = request ):

            tmp = request.GET['temporal'][1:]

            api.rango_tiempo( alerta.tiempo )

            temporal = api.obtener_temporal(tmp)

            if temporal.json() != []:

                tmp = temporal.json()[0]

                if tmp['codification'][0:4] == alerta.centro_emision:

                    results['cod'] = tmp['codification']
            
                    results['item'] = []

                    for item in tmp['items']:

                        results['item'].append([ item['quantity'], item['product']['name'], item['product']['barCode']])

            data_json = json.dumps(results)

        else:
            data_json = "fallo"
        
        mimetype = "application/json"
        
        return HttpResponse(data_json, mimetype)

