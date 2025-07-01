from django.shortcuts import render
from alerta.models import Alerta
from api.models import Api_Server
from django.views.generic import View
import json
from django.http import HttpResponse
# Create your views here.


def comanda(request,):

    global alerta

    alerta = Alerta.objects.get ( comanda = True )

    global api
    
    api =  Api_Server( alerta.server )

    api.obtener_token()

    tiempo = alerta.tiempo * 1000 

    return render(request, 'comanda/comanda.html', {'sonido': alerta.sonido , 'tiempo': tiempo })
class VerComanda(View):

    def is_ajax(self, request):
         
        return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

    def get(self, request):

        results= []
        
        if self.is_ajax( request = request ):

            api.rango_tiempo( alerta.tiempo )

            temporles = api.obtener_temporales()

            if temporles.json() != []:

                for temporal in temporles.json():
                    
                    data ={}

                    if temporal['codification'][0:4] == alerta.centro_emision:

                        data['cod'] = temporal['codification']
            
                        data['item'] = []

                        for item in temporal['items']:

                            data['item'].append([ item['quantity'], item['product']['name'], item['product']['barCode']])

                    else: 
                        print(temporal['codification'])
                
                results.append(data)

            data_json = json.dumps(results)

        else:
            data_json = "fallo"
        
        mimetype = "application/json"

        print(data_json)
        
        return HttpResponse(data_json, mimetype)

