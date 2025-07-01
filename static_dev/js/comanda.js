/*..............................................................................................
... PARA VALIDAR LOS DATOS .....................................................
.............................................................................................*/
var csrftoken = $.cookie('csrftoken');
function csrfSafeMethod(method){
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
/*..............................................................................................
... TODOS LOS CURSOS .............................................................
............................................................................................. */

$("#idStopComanda").on("click", function(){
    location.reload();
});

function agregarEnTabla(key){
    
    if (key['cod'] != undefined ){
  
                                    valor_retornado ="<tr>"+ 
                                    "<td><li>"+key['cod']+"</li></td>"+
                                    "<td id="+key['cod']+"cant></td>"+
                                    "<td id="+key['cod']+"prod></td>"+
                                    "<td id="+key['cod']+"cod></td>"+
                                    "</tr>";
        
                        $('#tablaComanda').prepend(valor_retornado);
                    

                        let valor_prod;
                        for(valor_prod = 0; valor_prod < key['item'].length; valor_prod++){
                            let key_prod = key['item'][valor_prod];
           
                            $("#"+key['cod']+"cant").append("<p class='"+key['cod']+" "+key_prod[2]+"'>"+key_prod[0]+"</p>");
                            $("#"+key['cod']+"prod").append("<p class='"+key_prod[2]+"'>"+key_prod[1]+"</p>");
                            $("#"+key['cod']+"cod").append("<p class='codigo "+key_prod[2]+"' name='"+key['cod']+"'>"+key_prod[2]+"</p>");
                        };
                    
                var audio = document.getElementById("audio");

                audio.play();
                
            }else { 
                console.log(key);
                console.log('indefinido');  
            }
}

function verComanda(){
	$.ajax({
		beforeSend : function(xhr, settings){
			if(!csrfSafeMethod(settings.type) && !this.crossDomain){
				xhr.setRequestHeader("X-CSRFToken", csrftoken);
			}
		},
		url : "/ver_comanda",
		type : "GET",
		success : function(json){
            if (json != []) {
                let valor;
                for(valor = 0; valor < json.length; valor++){ 
                    let key = json[valor];
                    agregarEnTabla(key);
                    };
                }else { console.log('Error en carga de respuesta');}
        }, 
            error : function(xhr, errmsg, err){
                console.log('Error en carga de respuesta');
            },
        
	});
};


