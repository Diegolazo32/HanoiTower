/*
Tarea Computo 2
Integrantes:
Angel Diego Hidalgo Cartagena
Henry Validmir Rubio Flores
*/

const plataforma = document.querySelectorAll('.cr')//Se guardan todos los elementos con la clase .cr
const col = document.querySelectorAll('.colum');//Se guardan todos los elementos con la clase .colum

for (var i = 0; i < plataforma.length; i++) {//A cada elemento del arreglo que se añaden
    plataforma[i].setAttribute("id", "piso" + i);//Atributo ID con un valor de "piso" junto a un numero unico
    plataforma[i].addEventListener("dragstart", (e) => dragIniciado(e), false);//Se le añade el evento de inicio de arrastre

}

for (var i = 0; i < col.length; i++) {//a cada elemento de las columnas se le agrega
    col[i].setAttribute("id", "columna" + i);//se le añade un atributo id
    col[i].addEventListener("drop", (ev) => manejarDrop(ev), false);//se  añaden los eventos de manejo de drop, sobre y salir de arrastre
    col[i].addEventListener('dragover', (ev) => dragsobrecolum(ev), false);
    col[i].addEventListener('dragleave', (ev) => dragLeave(ev), false);

}


col.forEach(torre => {//para cada columna

    let hijos = torre.children;//se guardan los hijos de cada torre

    for (let a = 0; a < hijos.length; a++) {

        if (a === hijos.length - 1) //si a es igual a la posicion del hijo, excepto el ultimo
        {
            hijos.item(i).setAttribute("draggable", "false");//se le añade el atributo de draggable  = false
        }
        else {
            hijos.item(i).setAttribute("draggable", "true");//Cuando es el ultimo se le añade el atributo de = true
        }

    }

    torre.addEventListener("mousemove", e => {//Se crea y añade un evento cuando se mueva el mouse

        for (let i = 0; i < hijos.length; i++) //si a es igual a la posicion del hijo, excepto el ultimo
        {
            if (i === hijos.length - 1) {
                hijos.item(i).setAttribute("draggable", "true");//se le añade el atributo de draggable  = true
            } else {
                hijos.item(i).setAttribute("draggable", "false");//Cuando es el ultimo se le añade el atributo de = false
            }
        }
    })

});

function dragsobrecolum(ev) {
    ev.preventDefault();//Cuando se arrastra sobre la columna se previene el comportamiento por defecto del navegador
}

function validar(vx, data) {

    let datax = data;//elemento disco
    let vx1 = vx;//id columna

    var parent = document.getElementById(vx);//La columna donde se pondra el disco
    var divs = parent.querySelectorAll('div');//Cuantos hijos tiene la columna

    if (divs.length === 0) {

        num = 0;//posicion donde se coloca el disco

        pegar(vx1, datax, num);//Se llama a la funcion pegar

    }
    else {
        num = divs.length;//Posicion donde se coloca el disco

        pegar(vx1, datax, num);//Se llama a la funcion pegar


    }
}


function dragLeave(ev) {

    ev.preventDefault();//Cuando se arrastra sobre la columna se previene el comportamiento por defecto del navegador
}

function pegar(ev, data, num) {

    var error = 0;//Bandera

    let numX = num;//Posicion donde se podra el disco

    var otraCol = document.getElementById(ev);//Se guarda la columa
    var otroPiso = document.getElementById(data);//Se guarda el disco a poner

    var xdd = document.getElementById(data).getAttribute('values');//Se guarda el valor el disco a poner

    var otraCol2;//Variable auxiliar

    if (numX > 0) //Si la posicion es mayor a 0, es decir hay un hijo
    {
        otraCol2 = document.getElementById(ev).lastElementChild.getAttribute('values');//Se guarda el valor del nuevo elemento a poner

    }


    if (xdd > otraCol2) {//Si el valor a agregar es mayor al valor del hijo ultimo se muestra un error y no se apendiza
        let a = alert('No se puede colocar un bloque mas grande sobre uno pequeño')

    }
    else {

        for (var t = 0; t < 5; t++) {//Se evalua si el lugar donde se quiere poner un bloque es otro bloque

            if (otraCol.getAttribute("id") === "piso" + t) {//Si el id del objetivo es igual al de un bloque, se muestra un error

                let a = alert('No se puede colocarse un bloque sobre otro')
                error = 1;//Se activa una bandera de error
                break;
            }

            if (otraCol === otroPiso.parentNode) {//Si el lugar de objetivo es el mismo nodo padre

                error = 1;//Salta la bandera de error
                break;
            }

        }

        if (error === 0) {//Si no hay salto de bandera
            otraCol.appendChild(document.getElementById(data));//Se apendiza el elemento

            switch (numX) {//Segun la posicion
                case 0://Segun el caso, se ubica en la torre

                    otroPiso.style.top = "125px";
                    break;
                case 1:

                    otroPiso.style.top = "100px";
                    break;
                case 2:

                    otroPiso.style.top = "75px";
                    break;
                case 3:

                    otroPiso.style.top = "50px";
                    break;

                case 4:
                    otroPiso.style.top = "25px";

                    break;
            }
        }


    }

}



function manejarDrop(ev) {

    ev.preventDefault();
    xs = ev.target.id;//id de columna objetivo

    var data = ev.dataTransfer.getData("idpiso");//Id del disco que se va a pegar
    validar(xs, data);


}

function dragIniciado(e) {//Funcion cuando se inicia el drag
    e.dataTransfer.setData("idpiso", e.target.id);//Id del bloque que se mueve
}

