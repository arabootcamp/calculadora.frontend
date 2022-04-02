// Los eventos FrontEnd pueden ser manejados con JavaScript nativo o con Jquery.
// Integre las operaciones básicas de una calculadora (suma, resta, multiplicación y división) y utilice gráficamente la librería Bootstrap para la visualización de la calculadora.

//seleccionando elementos del DOM
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear')
const data = document.getElementById('data');
const info = document.getElementById('info');

//variables

//Funciones
/////Formatear a numero
const numFormat = num => new Intl.NumberFormat('cl').format(num);
////Limpiar span
const infoClean = () => {
  info.className = '';
}
const newExpAlgMsg = c => {
  //si lo anterior era un resultado, limpio el visor para comenzar otra expresión algebraica
  if (c == '=') {
    data.innerHTML = '';
    infoClean();
    info.classList.add("cu-span", "cu-span--warning");
    info.innerHTML = "Iniciando nueva expresión algebraica"
  } else {
    infoClean();
    info.classList.add('d-none')
  }
}

//Expresiones regulares, los numeros pueden ser negativos
const regExpNumber = /^[-]?(0|[1-9][0-9]*)$/;
const regExpOperation = /^[-]?(0|[1-9][0-9]*)([+-\/\*]{1}(0|[1-9][0-9]*))+$/;

//Eventos
numbers.forEach(el => {
  el.addEventListener('click', evt => {
    //Mensaje si estamos comenzando una nueva expresioón algebraica y atualización data
    newExpAlgMsg(data.innerHTML[0]);

    let num = evt.currentTarget.dataset.num;
    let splitPrevStr = data.innerHTML.split('/[+-\/\*]/');
    let lastPrevElement = splitPrevStr[splitPrevStr.length - 1];
    //puedo tener 0 pero no 00001, reviso el ultimo elemento el cero es reemplazable
    if (lastPrevElement == '0')
      data.innerHTML = data.innerHTML.slice(0, data.innerHTML.length - 1) + num
    else
      data.innerHTML += num;
  })
})

operators.forEach(el => {
  el.addEventListener('click', evt => {
    //Mensaje si estamos comenzando una nueva expresioón algebraica y atualización data
    newExpAlgMsg(data.innerHTML[0]);

    let op = evt.currentTarget.dataset.op;
    let previousStr = data.innerHTML;
    let strLength = previousStr.length;

    //La expresion algebraica no puede iniciar con operadores 
    if (strLength == 0 && (op == '/' || op == '*' || op == '-' || op == '+'))
      return;

    //Si el string es un numero o es una expresion algebraica 
    if (regExpNumber.test(previousStr) || regExpOperation.test(previousStr))
      data.innerHTML += op
    else
      //elimino el ultimo operador en el string y lo uno al nuevo operador
      data.innerHTML = previousStr.slice(0, strLength - 1) + op;
  })
})

equals.addEventListener('click', evt => {
  infoClean();
  info.classList.add('d-none');

  if (data.innerHTML == "" || data.innerHTML[0] == "=")
    return;
  //data.innerHTML viene sin el =, pero puede venir con un operador en el final por eso validamos.  
  if (regExpNumber.test(data.innerHTML) || regExpOperation.test(data.innerHTML))
    data.innerHTML = '= ' + eval(data.innerHTML).toFixed(2);
  else {
    info.classList.remove('d-none');
    info.classList.add("cu-span", "cu-span--error");
    info.innerHTML = "Error, ingreso de ejemplo: 5+2*3="
  }
})

clear.addEventListener('click', evt => {
  infoClean();
  info.classList.add('d-none');
  data.innerHTML = '';
})