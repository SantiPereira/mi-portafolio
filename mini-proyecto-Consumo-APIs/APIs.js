
//* Recoleca los valores del html 
var barraBusqueda = document.querySelector(".barra-de-busqueda") ; 
var botonBusqueda = document.querySelector(".boton-de-busqueda") ; 

//* Guarda los valores
var busqueda ; 


// console.log('hola mundo') ; 

//* Creamos al funcion que al oprimir el boton boton-buscqueda guarde el valor en buesqueda 
    function realizarBusqueda() {
        busqueda = barraBusqueda.value ; 
        // console.log('Conteido de la barra de busqueda : ' + busqueda ) ;  

        if(!busqueda) return ;

        //*Creamos la URL de Deezer
        const url = `https://api.deezer.com/search?q=${encodeURIComponent(busqueda)}&output=jsonp&callback=mostrarResultados`;

        //*Creamos un tag <script> para hacer la peticion JSONP
        const script = document.createElement('script') ; 
        script.src = url ; 
        document.body.appendChild(script) ; 
    }

botonBusqueda.addEventListener('click' , realizarBusqueda ) ; 

//*Funcion que Deezer llamara con los respultados: 
function mostrarResultados(respuesta) {
    console.log('Res : ' , respuesta.data[0]) ;

    const contenedor = document.querySelector('.Res-Busqueda');
    contenedor.innerHTML = ''; // limpia resultados anteriores
    
    //*Tomemos el buscamis todos los resultado de la busqueda
    for(var i = 0 ; i < respuesta.data.length ; i++ ){
        var res = respuesta.data[i] ;
        
        crarTarjetaResBusqueda(res) ; 
    }
}



//*Funcion que crea la tarjeta de Res-Busqueda
function crarTarjetaResBusqueda(res) {

    //*Creamos el contender
    const contador = document.querySelector('.Res-Busqueda') ; 

    //*Creamos la tarjeta
    const tarjeta = document.createElement('article') ; 
    tarjeta.classList.add('tarjeta-res-busqueda') ; 
    // contador.appendChild(tarjeta) ; 

    //*Creamos el apartado para la imagne dentro de la tarjeta 
    const imgBusqueda = document.createElement('img') ; 
        //*Cabiamos la img por la del albun que nos da la API
    // imgBusqueda.src = res.album.cover_medium ;
    imgBusqueda.src = (res.album && res.album.cover_medium) ? res.album.cover_medium : '../img/fondo_proyetos.jpg'; 
    imgBusqueda.alt = res.title ||'Portada' ; 
    imgBusqueda.draggable = false ;
    tarjeta.appendChild(imgBusqueda) ; 
    
    //*Creamos el apartado del Footer
    const Footer = document.createElement('footer') ; 
    Footer.classList.add('footer-tarjeta-res') ;
    // tarjeta.appendChild(Footer) ; 

        //*Creamos el boton de corazon
        const botonMeGusta = document.createElement('a')
            botonMeGusta.href = "#";
        const imgMeGusta = document.createElement('img')
        imgMeGusta.src = "../img/corazon.png";
        imgMeGusta.alt = "Me Gusta";
        imgMeGusta.draggable = false;

        botonMeGusta.appendChild(imgMeGusta) ;
        Footer.appendChild(botonMeGusta);

        //*Creamos el boton de pley 
        //!Camiar luego para que el boton reproduzca la preview
        const botonPlayLink = document.createElement('a');
        botonPlayLink.href = "#"; // podrías usar res.preview o abrir player
        const botonPlayImg = document.createElement('img');
        botonPlayImg.src = "../img/boton-de-play.png";
        botonPlayImg.alt = "Reproducir";
        botonPlayImg.draggable = false;
        botonPlayLink.appendChild(botonPlayImg);
        Footer.appendChild(botonPlayLink);


        tarjeta.appendChild(Footer);
        contador.appendChild(tarjeta);


}



