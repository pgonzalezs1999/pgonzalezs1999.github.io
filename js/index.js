function ampliarFoto(bool)
{
    if(bool == 1 && window.innerWidth > 800)
    {
        document.getElementById("ampliarFoto").style.display = "block";
        document.documentElement.scrollTop = 0;
    }
    else
    {
        document.getElementById("ampliarFoto").style.display = "none";
    }
}

$(".contenedorSecciones").load("html/seccionAbout.html" + " .seccion");

$(document).ready(function() // Cambiar seccion
{
    let dispositivo = 0;
    if(window.innerWidth >= 800) { dispositivo = 1; }
    $(".intercambiador").click(function()
    {
        var url = $(this).attr("href");
        $(".contenedorSecciones").load(url + " .seccion");
        listenerPosicion();
        if(dispositivo == 1) { window.scrollTo({top: 190, behavior: 'smooth'}); }
        else { window.scrollTo({top: 670, behavior: 'smooth'}); }
        /*while(document.getElementsByClassName("animInicioTarjeta").length > 0)
        {
            document.getElementsByClassName("animInicioTarjeta")[0].classList.remove("animInicioTarjeta");
        }*/
        return false;
    });
});

$(function() // Cambiar barra de navegacion y circulo al bajar
{
    $(window).scroll(function()
    {
        var scroll = $(window).scrollTop();
        if (scroll >= 200)
        {
            $(".circuloSubir").addClass("circuloFijo");
            $(".navArriba").addClass("navFija");
        }
        else
        {
            $(".circuloSubir").removeClass("circuloFijo");
            $(".navArriba").removeClass("navFija");
        }
    });
});

function verDetalles(id)
{
    switch(id)
    {
        case 1:
            $(".tarjetaDetalles").each(function()
            {
                if(this.className != "tarjetaDetalles infoJava")
                {
                    let thisInfo = this.className
                    this.className += " slideAux";
                    $(".slideAux").slideUp();
                    this.className = thisInfo;
                }
            });
            $(".infoJava").slideToggle();
        break;
        case 2:
            $(".tarjetaDetalles").each(function()
            {
                if(this.className != "tarjetaDetalles infoPython")
                {
                    let thisInfo = this.className
                    this.className += " slideAux";
                    $(".slideAux").slideUp();
                    this.className = thisInfo;
                }
            });
            $(".infoPython").slideToggle();
        break;
        case 3:
            $(".tarjetaDetalles").each(function()
            {
                if(this.className != "tarjetaDetalles infoWeb")
                {
                    let thisInfo = this.className
                    this.className += " slideAux";
                    $(".slideAux").slideUp();
                    this.className = thisInfo;
                }
            });
            $(".infoWeb").slideToggle();
        break;
        case 4:
            $(".tarjetaDetalles").each(function()
            {
                if(this.className != "tarjetaDetalles info3Dmax")
                {
                    let thisInfo = this.className
                    this.className += " slideAux";
                    $(".slideAux").slideUp();
                    this.className = thisInfo;
                }
            });
            $(".info3Dmax").slideToggle();
        break;
    }
}

function cerrarDetalles()
{
    $(".tarjetaDetalles").each(function()
    {
        let thisInfo = this.className
        this.className += " slideAux";
        $(".slideAux").slideUp();
        this.className = thisInfo;
    });
}

let invertirTheme = 0;

function darkMode()
{
    invertirTheme += 1;

    if(invertirTheme % 2 != 0) // MODO OSCURO
    {
        $(":root").css("--tarjetas", "#222222");
        $(":root").css("--bordes", "#555555");
        $(":root").css("--fondo", "#111111");
        $(":root").css("--letras", "#EEEEEE");
        $(":root").css("--sombras", "rgb(255, 255, 255, 0.4)");
        $(":root").css("--fondoSuavizado1", "#222222");
        $(":root").css("--miColor", "#AA8833");
        $(":root").css("--urls", "#C3D0F7");
        $(":root").css("--etiquetas", "#CCCCCC");
        document.getElementById("botonDarkMode").firstChild.src = "images/darkMode0.png";
    }
    else // MODO CLARO
    {
        $(":root").css("--tarjetas", "#F8F8F8");
        $(":root").css("--bordes", "#AAAAAA");
        $(":root").css("--fondo", "#FFFFFF");
        $(":root").css("--letras", "#000000");
        $(":root").css("--sombras", "rgb(0, 0, 0, 0.25)");
        $(":root").css("--fondoSuavizado1", "#F4F4F4");
        $(":root").css("--miColor", "#F1C40F");
        $(":root").css("--urls", "#0000EE");
        $(":root").css("--etiquetas", "#555555");
        document.getElementById("botonDarkMode").firstChild.src = "images/darkMode1.png";
    }

    [].forEach.call(document.querySelectorAll(".imgDarkMode"), function(elem)
    {
        elem.style.filter =  "invert(" +  invertirTheme % 2 + ")";
    });
}

let posY; // Pos Y actual de la pantalla
let suavizado = 94; // Porcentaje de smoothness del regreso

function regresar(destino) // La funcion onClick del boton regresar
{
    posY = document.documentElement.scrollTop; // Actualizar la posicion actual de la pantalla
    subirPantalla(destino);
}

function subirPantalla(destino) // Iteraciónde subida de pantalla gradual
{
    if(posY <= 1) { posY = destino } // Nunca puede llegar a 0, asi que se le ayuda manualmente    
    else
    {
        posY = posY*suavizado/100; // Calcular la altura de la siguiente iteracion
        document.documentElement.scrollTop = posY; // Mover la pantalla a la altura calculada

        setTimeout(function() { subirPantalla(destino); }, 5); // Esperar ms para que se sienta como transicion
    }
}

darkMode();
darkMode();

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (document.documentElement.clientHeight+100) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function comprobarPosiciones()
{
    if(document.getElementById("tarjetaGreySystems") != null)
    {
        if(isInViewport(document.getElementById("tarjetaGreySystems"))) { excluirAnimacionInicial(document.getElementById("tarjetaGreySystems")); }
        if(isInViewport(document.getElementById("tarjetaNewMun"))) { excluirAnimacionInicial(document.getElementById("tarjetaNewMun")); }
        if(isInViewport(document.getElementById("tarjetaDom3D"))) { animacionInicialTarjeta(document.getElementById("tarjetaDom3D")); }
        if(isInViewport(document.getElementById("tarjetaCAIL"))) { animacionInicialTarjeta(document.getElementById("tarjetaCAIL")); }
    }
    else if(document.getElementById("tarjetaUEM") != null)
    {
        if(isInViewport(document.getElementById("tarjetaUEM")))
        {
            excluirAnimacionInicial(document.getElementById("tarjetaUEM"));
            excluirAnimacionInicial(document.getElementById("tarjetaUEMabajo"));
        }
        if(isInViewport(document.getElementById("tarjetaDesignThinking"))) { excluirAnimacionInicial(document.getElementById("tarjetaDesignThinking")); }
        if(isInViewport(document.getElementById("tarjetaMarketingGoogle"))) { animacionInicialTarjeta(document.getElementById("tarjetaMarketingGoogle")); }
        if(isInViewport(document.getElementById("tarjetaCesur")))
        {
            animacionInicialTarjeta(document.getElementById("tarjetaCesur"));
            animacionInicialTarjeta(document.getElementById("tarjetaCesurAbajo"));
        }
        if(isInViewport(document.getElementById("tarjetaCambridge"))) { animacionInicialTarjeta(document.getElementById("tarjetaCambridge")); }
    }
}

function listenerPosicion()
{
    comprobarPosiciones();
    document.addEventListener('scroll', function () // Animacion al aparecer nuevo elemento en pantalla
    {
        comprobarPosiciones();
    }, { 
        passive: true 
    });
}
listenerPosicion();

function animacionInicialTarjeta(elemento)
{
    elemento.classList.add("animInicioTarjeta");
}

function excluirAnimacionInicial(elemento)
{
    elemento.classList.add("noAnim");
}