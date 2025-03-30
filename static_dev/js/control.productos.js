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
                item = "<tr id='"+key['cod']+" "+ key['item'][i][2]+"'>"+
                        "<td>"+key['cod']+"</td>"+
                        "<td>"+key['item'][i][0]+"</td>"+
                        "<td>"+key['item'][i][1]+"</td>"+
                        "<td>"+key['item'][i][2]+"</td>"+
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
        //validadorCodigos();
        let codBar = $('#idCodBarra').val();
        console.log(codBar);
        verTemporal(codBar);
        document.getElementById('idCodBarra').value= "";
    }
});

function validadorCodigos(){
    let codBarra = $( "#idCodBarra" ).val();
    let codigos = document.getElementsByClassName('codigo');
    let i;
    for( i=0; i < codigos.length; i++ ){
        let codigo = codigos[i];
        let cod = codigo.textContent
        if (codBarra == cod){
        let clase = codigo.getAttribute("name");
        let clases = clase + " " + cod; 
        let unidades = document.getElementsByClassName(clases)
        let elemento = unidades[0];
        let unidad = parseInt(elemento.textContent) - 1;
        if(unidad == 0){
            let lineas = elemento.parentElement.parentElement 
            let eElininar = Array.prototype.slice.call(lineas.getElementsByClassName(cod), 0);             
            for(element of eElininar){  
                //element.remove();

                let clas = element.getAttribute('class');

                $( "."+clas ).last().addClass( "line" ); 
                elemento.innerHTML = unidad ;
            }
            i = codigos.length;
        }else{
            elemento.innerHTML = unidad ;
            i = codigos.length;
        };
    };

    };
};  