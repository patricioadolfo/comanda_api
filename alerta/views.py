from django.shortcuts import render
from server.models import Server
from alerta.models import Alerta
from api.models import Api_Server
from django.views.generic import View
import json
from django.http import HttpResponse
# Create your views here.

server = Server.objects.get( estado = True)

alerta = Alerta.objects.get ( server = server )

api = Api_Server( server )

def index(request,):

    api.rango_tiempo( alerta.tiempo )

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

            print(api.t_inicio, api.ahora)

            temporles = api.obtener_temporales()

            if temporles.json() != []:

                for temporal in temporles.json():
                    
                    data ={}

                    if temporal['codification'] != '9999999999999999':

                        data['cod'] = temporal['codification']
            
                        data['item'] = []

                        for item in temporal['items']:

                            data['item'].append([ item['quantity'], item['product']['name'], item['product']['barCode']])
                
                
                results.append(data)

            data_json = json.dumps(results)

        else:
            data_json = "fallo"
        
        mimetype = "application/json"
        
        return HttpResponse(data_json, mimetype)

def ver_comanda(request):

    server = Server.objects.get( estado = True)

    tiempo = Alerta.objects.get ( server = server )

    api = Api_Server( server )

    api.rango_tiempo( tiempo.tiempo )

    api.obtener_token()

    temporles = api.obtener_temporales()

    if temporles.json() != []:

        for temporal in temporles.json():

            print(temporal['codification'])

            for item in temporal['items']:

                print(item['product']['name'])
                print(item['product']['barCode'])


            print('///////////////////')



    return render(request, 'comanda/comanda.html', {})

