// Los eventos FrontEnd pueden ser manejados con JavaScript nativo o con Jquery.
// Integre las operaciones básicas de una calculadora (suma, resta, multiplicación y división) y utilice gráficamente la librería Bootstrap para la visualización de la calculadora.

// seleccionando elementos del DOM
const equals = document.getElementById('equals');
const clear = document.getElementById('clear')
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const data = document.getElementById('data');
const error = document.getElementById('error')

//formatear a numero
let numFormat = num => new Intl.NumberFormat('cl').format(num);

//Expresiones regulares
const regExpOperation = /^(0|[1-9][0-9]*)([+-\/\*]{1}(0|[1-9][0-9]*))+$/;

//Eventos
numbers.forEach(el => {
  el.addEventListener('click', evt => {
    let num = parseInt(evt.currentTarget.dataset.id);
    data.innerHTML += num;
  })
})

operators.forEach(el => {
  el.addEventListener('click', evt => {
    let op = evt.currentTarget.dataset.op;
    data.innerHTML += op;
  })
})

equals.addEventListener('click', evt => {
  if (data.innerHTML == "")
    return;

  if (regExpOperation.test(data.innerHTML)) {
    error.classList.add("d-none");
    data.innerHTML = eval(data.innerHTML).toFixed(2);
  } else
    error.classList.remove("d-none");
})

clear.addEventListener('click', evt => {
  data.innerHTML = '';
  error.classList.add("d-none");
})