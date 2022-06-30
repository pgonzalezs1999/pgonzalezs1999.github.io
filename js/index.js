function ampliarFoto(bool)
{
    if(bool == 1 && screen.width >= 800)
    {
        document.getElementById("ampliarFoto").style.display = "block";
    }
    else
    {
        document.getElementById("ampliarFoto").style.display = "none";
        document.documentElement.scrollTop = 0;
    }
}

$(".contenedorSecciones").load("html/seccionAbout.html" + " .seccion");

$(document).ready(function()
{
    $(".intercambiador").click(function()
    {
        var url = $(this).attr("href");
        $(".contenedorSecciones").load(url + " .seccion");
        regresar();
        return false;
    })
});

$(function()
{
    $(window).scroll(function()
    {
        var scroll = $(window).scrollTop();
        if (scroll >= 200)
        {
            $(".circuloSubir").addClass("circuloFijo");
            $("nav").addClass("navFija");
        }
        else
        {
            $(".circuloSubir").removeClass("circuloFijo");
            $("nav").removeClass("navFija");
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
    // document.querySelector(".ulMetamask button").style.color = "#000000";
}

let altura; // Guardar altura actual de la pantalla
let suavizado = 94; // Entre 1 y 99.999999, cuando mas alto mas smooth

function regresar() // La funcion onClick del boton regresar
{
    altura = document.documentElement.scrollTop; // Actualizar la posicion actual de la pantalla
    subirPantalla();
}

function subirPantalla() // Función recursiva que sube la pantalla gradualmente
{
    if(altura <= 1) { altura = 0 }// Por matematicas nunca puede llegar a 0, asi que se le ayuda manualmente    
    else
    {
        altura = altura*suavizado/100; // Calcular la altura de la siguiente iteracion
        document.documentElement.scrollTop = altura; // Mover la pantalla a la altura calculada

        setTimeout(function() { subirPantalla(); }, 5); // Esperar unos milisegundos para que se sienta como una transicion
    }
}

function cambiarIdioma(idioma)
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
}

darkMode();
darkMode();