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
                        "<td class='unidad "+key['cod']+" "+ key['item'][i][2]+"'>"+key['item'][i][0]+"</td>"+
                        "<td>"+key['item'][i][1]+"</td>"+
                        "<td class='codigo' name= '"+key['cod']+" "+key['item'][i][2]+"'>"+key['item'][i][2]+"</td>"+
                        "<td>"+
                            "<input class= 'cantidad "+key['cod']+" "+ key['item'][i][2]+"'  onchange='ingresoManual(this)' type='number' maxlength='10' value='0'>"+
                        "</td>"+
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
 
            let unidad = parseInt(cantidad[0].value) + 1;
            
            let cant = document.getElementsByClassName("unidad "+ name)

            console.log(cant[0].textContent)

            if(unidad == parseInt(cant[0].textContent)){
                
                let aEliminar = cantidad[0].parentElement.parentElement;
                
                aEliminar.remove();
            
            }else {
                //let linea = cantidad[0].parentElement;
                cantidad[0].value = unidad ;
                console.log(cantidad[0].value)
                //$("."+ "cantidad "+ name ).val(unidad);
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

function ingresoManual(obj){
    let unidad = $(obj).parent().parent().find('.unidad');
     
    if( obj.value == unidad[0].textContent ){

        let aEliminar = obj.parentElement.parentElement;

         aEliminar.remove();
     }
}