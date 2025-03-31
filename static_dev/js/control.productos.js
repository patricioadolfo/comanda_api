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


function agregarEnTabla(key){
    console.log(key)
            let i;
            for(i = 0; i < key['item'].length; i++){
                item = "<tr id='linea "+key['cod']+" "+ key['item'][i][2]+"'>"+
                        "<td>"+key['cod']+"</td>"+
                        "<td class='cantidad "+key['cod']+" "+ key['item'][i][2]+"'>"+key['item'][i][0]+"</td>"+
                        "<td>"+key['item'][i][1]+"</td>"+
                        "<td class='codigo' name= '"+key['cod']+" "+key['item'][i][2]+"'>"+key['item'][i][2]+"</td>"+
                        "<td><a type='button' id='check'>ok</a></td>"
                        "</tr>";
                $('#tablaComanda').prepend(item);
            };              
};

function verTemporal(codBar){
	$.ajax({
		beforeSend : function(xhr, settings){
			if(!csrfSafeMethod(settings.type) && !this.crossDomain){
				xhr.setRequestHeader("X-CSRFToken", csrftoken);
			}
		},
		url : "/controlar_productos",
		type : "GET",
        data : { temporal : codBar, },
		success : function(json){
            if (json != {}) {
                agregarEnTabla(json)
                }else { console.log('vacio');}
        }, 
            error : function(xhr, errmsg, err){
                console.log('Error en carga de respuesta');
            },
        
	});
};

document.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        let codBar = $('#idCodBarra').val();

        if(codBar.startsWith("F")){
            verTemporal(codBar);
        }else{
            validadorCodigos(codBar);
        };
        
        document.getElementById('idCodBarra').value= "";
    }
});

function validadorCodigos(codBar){
    
    let codigos = document.getElementsByClassName('codigo');
    
    let i;
    for( i=0; i < codigos.length; i++ ){
    
        let codigo = codigos[i];
        let cod = codigo.textContent;
        
        if (codBar == cod){

            let name = codigo.getAttribute('name')

            let cantidad = document.getElementsByClassName("cantidad "+ name);

            let unidad = parseInt(cantidad[0].innerHTML) - 1;
  
            if(unidad == 0){
                
                let aEliminar = cantidad[0].parentElement;
                
                aEliminar.remove();
            
            }else {
                let linea = cantidad[0].parentElement;
                cantidad[0].innerHTML = unidad ;
                i = codigos.length;
            
            };
        };
    };
};


$("#check").on("click", function(){
    console.log($(this))
    let linea = $(this).parentElement;
    console.log(linea)
});
