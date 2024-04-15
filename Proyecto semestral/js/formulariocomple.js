console.log("estoy conectado");
let nombre = document.getElementById("nombre");

let btnEnviar = document.getElementById("btnEnviar");

let req= [];

btnEnviar.addEventListener("click", function(e){
    e.preventDefault();

    nombre = nombre.value;
    apellido = apellido.value;
    

    req.push({
        nombre,
        apellido
    });


    console.log(`El nombre es: ${nombre}`);
    console.log(`El nombre es: ${apellido}`);
    console.log('Estoy haciendo click');

})

console.log(nombre);