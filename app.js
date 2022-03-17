const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
formulario.addEventListener('submit',buscarClima);
})

function buscarClima(e){
    e.preventDefault();
   
    //validar   
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais ===''){
        mostrarError('Ambos campos son obligatorios');
        return;
    }
    //consultar api
    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){
    const alerta =document.querySelector('.bg-red-100');
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded',
        'max-w-md','mx-auto','mt-6','text-center');
        alerta.innerHTML= `
        <strong class="front-bold">ERROR</strong>
        <span class="block">${mensaje}</span>
        `
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

}
function consultarAPI(ciudad,pais){
    const appId='95bafbec15141b0f12d0fd3ea4acd749';
    const url=`
    https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos=>{
        limpiarHTML();
        if(datos.cod ==="404"){
            mostrarError('Ciudad no encontrada')
            return;
        }
        mostrarClima(datos);
    })



}
function mostrarClima(datos){
    const {name,main:{temp,temp_max,temp_min}} = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad= document.createElement('p');
    nombreCiudad.textContent=`Clima en ${name}`;
    nombreCiudad.classList.add('text-bold','text-2xl');


    const actual = document.createElement('p');
    actual.innerHTML=`Temperatura actual : ${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-4xl');

    const tempMax=document.createElement('p');
    tempMax.innerHTML=`Temperatura maxima : ${max} &#8451;`;
    tempMax.classList.add('text-xl');

    const tempMin=document.createElement('p');
    tempMin.innerHTML=`Temperatura minima : ${min} &#8451;`;
    tempMin.classList.add('text-xl');

    const resultadoDiv=document.createElement('div');
    resultadoDiv.classList.add('text-center','text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    resultado.appendChild(resultadoDiv);

}
function kelvinACentigrados(grados){
return parseInt(grados-273.15);
}

function limpiarHTML(){
while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
}
}