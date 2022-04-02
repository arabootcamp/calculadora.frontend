// Los eventos FrontEnd pueden ser manejados con JavaScript nativo o con Jquery.
// Integre las operaciones básicas de una calculadora (suma, resta, multiplicación y división) y utilice gráficamente la librería Bootstrap para la visualización de la calculadora.

//seleccionando elementos del DOM
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear')
const data = document.getElementById('data');
const error = document.getElementById('error');

//variables

//Funciones
/////Formatear a numero
let numFormat = num => new Intl.NumberFormat('cl').format(num);

//Expresiones regulares, los numeros pueden ser negativos
const regExpNumber = /^(0|[1-9][0-9]*)$/;
const regExpOperation = /^(0|[1-9][0-9]*)([+-\/\*]{1}(0|[1-9][0-9]*))+$/;

//Eventos
numbers.forEach(el => {
  el.addEventListener('click', evt => {
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

  if (data.innerHTML == "")
    return;
  //data.innerHTML viene sin el =, pero puede venir con un operador en el final por eso validamos.  
  if (regExpNumber.test(data.innerHTML) || regExpOperation.test(data.innerHTML)) {
    error.classList.add("d-none");
    data.innerHTML = eval(data.innerHTML).toFixed(2);
  } else {
    error.innerHTML = "Error, ingreso de ejemplo: 5+2*3="
    error.classList.remove("d-none");
  }
})

clear.addEventListener('click', evt => {
  data.innerHTML='';
  error.classList.add("d-none");
})