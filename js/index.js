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

$(document).ready(function() // Cambiar sección
{
    let dispositivo = 0;
    if(window.innerWidth >= 800) { dispositivo = 1; }
    $(".intercambiador").click(function()
    {
        var url = $(this).attr("href");
        $(".contenedorSecciones").load(url + " .seccion");
        if(dispositivo == 1) { window.scrollTo({top: 170, behavior: 'smooth'}); }
        else { window.scrollTo({top: 690, behavior: 'smooth'}); }
        return false;
    });
});

$(function() // Cambiar barra de navegación y círculo al bajar
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
        $(":root").css("--tarjetasArriba", "#111111");
        $(":root").css("--tarjetasAbajo", "#222222");
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
        $(":root").css("--tarjetasArriba", "#FFFFFF");
        $(":root").css("--tarjetasAbajo", "#F8F8F8");
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

let posV2; // Guardar altura actual de la pantalla
let suavizado2 = 94; // Entre 1 y 99.9999, cuando mas alto mas smooth

function regresar(destino) // La funcion onClick del boton regresar
{
    posV2 = document.documentElement.scrollTop; // Actualizar la posicion actual de la pantalla
    subirPantalla(destino);
}

function subirPantalla(destino) // Función recursiva que sube la pantalla gradualmente
{
    if(posV2 <= 1) { posV2 = destino }// Por matematicas nunca puede llegar a 0, asi que se le ayuda manualmente    
    else
    {
        posV2 = posV2*suavizado2/100; // Calcular la altura de la siguiente iteracion
        document.documentElement.scrollTop = posV2; // Mover la pantalla a la altura calculada

        setTimeout(function() { subirPantalla(destino); }, 5); // Esperar unos milisegundos para que se sienta como una transicion
    }
}

/*function cambiarIdioma(idioma)
{
    switch(idioma)
    {
        case 1:
            console.log("español");
        break;
        case 2:
            console.log("ingles");
        break;
    }
}*/

darkMode();
darkMode();