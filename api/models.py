import requests
import datetime as dt
from datetime import timedelta

class Api_Server():
    
    def __init__(self, server ):
        
        self.ip = server.ip,
            
        self.puerto = server.puerto,
            
        self.usuario = server.usuario,
        
        self.contraseña = server.contraseña
    
    def rango_tiempo( self, segundos ):
        
        tiempo = dt.datetime.now()
        
        t= tiempo.strftime("%Y-%m-%dT%H:%M:%S.%f")
        
        self.ahora = t[:-3]+"-0300"

        rango = tiempo - timedelta(seconds = segundos )

        r= rango.strftime("%Y-%m-%dT%H:%M:%S.%f")

        self.t_inicio= r[:-3]+"-0300"

    def obtener_token(self,):

        dato= {
            
            'scope': 'read'
            
            }
                
        header= {
            
            'Content-Type': 'application/json',
            
            'Authorization':'Basic endlYjp6ZXR0aTIwMTk='
            
            }
        
        urltoken = 'http://{ip}:{puerto}/oauth-server/oauth/token?username={usuario}&password={contraseña}&grant_type=password'.format(
            
            ip = self.ip[0],
            
            puerto = str(self.puerto[0]),
            
            usuario = self.usuario[0],
            
            contraseña = self.contraseña
        
        )

        token = requests.post( urltoken, headers = header, data = dato )

        self.token = token.json()['access_token']

    def obtener_temporales(self,):

      header= {
          
          'accept': 'application/json',
              
          'Content-Type': 'application/json',
          
          'Authorization': 'Bearer ' + self.token 
          
          }
      
      data= {
          
          "letter": "B",
        
          "idValueType": 197,
        
          "emissionDateFrom": self.t_inicio,
        
          "emissionDateTo": self.ahora
        
          }

      url= 'http://{ip}:{puerto}/api-rest/v2/2307101/sales-receipts/search?per_page=10&ascending_order=true&include_concepts=false&include_items=true&include_agreements=false&include_completed=true&include_others=true'.format(
          
          ip = self.ip[0],

          puerto = str(self.puerto[0])
          
      )

      temporales = requests.post(url, headers= header, json= data)

      return temporales

    def obtener_temporal(self, temporal):

        header= {
          
            'accept': 'application/json',
              
            'Content-Type': 'application/json',
          
            'Authorization': 'Bearer ' + self.token 
          
        }
      
        data= {

            "codification": temporal,
        }

        url= 'http://{ip}:{puerto}/api-rest/v2/2307101/sales-receipts/search?per_page=10&ascending_order=true&include_concepts=false&include_items=true&include_agreements=false&include_completed=true&include_others=true'.format(
          
            ip = self.ip[0],

            puerto = str(self.puerto[0])
          
        )

        temporal = requests.post(url, headers= header, json= data)

        return temporal