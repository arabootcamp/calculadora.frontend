// Los eventos FrontEnd pueden ser manejados con JavaScript nativo o con Jquery.
// Integre las operaciones básicas de una calculadora (suma, resta, multiplicación y división) y utilice gráficamente la librería Bootstrap para la visualización de la calculadora.


const eq = document.getElementById('eq');
const c= document.getElementById('c')
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const dato = document.getElementById('dato');



numbers.forEach(el => {
  el.addEventListener('click', evt => {
    let num = parseInt(evt.currentTarget.dataset.id);
    dato.innerHTML += num;
  })
})

operators.forEach(el => {
  el.addEventListener('click', evt => {
    let op = evt.currentTarget.dataset.op;
    dato.innerHTML += op;
  })
})


const re=/^([0-9]+[+-]{1}[0-9]+)+$/;

eq.addEventListener('click', evt => {

  console.log(dato.innerHTML)
  if( re.test(dato.innerHTML)){
    console.log("esta bien")
  }  
  else{
    console.log('esta mal')
  }
  dato.innerHTML = eval(dato.innerHTML).toFixed(2);
})

c.addEventListener('click', evt => {
  dato.innerHTML = '';
})