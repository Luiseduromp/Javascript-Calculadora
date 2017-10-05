//Proyecto JAVASCRIPT Calculadora. Luis Eduardo Romero Paredes
//Objeto Calculadora
var calc = {
  display: '0',
  operador: '',
  num: 0,
  rflag: false,
  resultado: 0,
  //funcion reset calculadora
  reset: function(){
    console.log('Reset calculadora');
    this.display = '0';
    this.showDisplay(this.display);
    this.num = 0;
    this.rflag = false;
    this.resultado = 0;
    this.operador = '';
  },
  //funcion para ingresar numeros al presionar teclas
  numero: function(tecla){
    if(this.rflag){
      this.display = '0';
      this.rflag = false;
    }
    if(this.display == '0') this.display = tecla;
    else {
      var digits = this.display;
      if(digits.replace(/[^0-9]/g,'').length < 8) this.display = this.display + tecla;
    }
    this.showDisplay(this.display);
  },
  //funcion mostrar numero en display
  showDisplay: function(num){
    document.getElementById('display').innerHTML = num;
  },
  //funcion cambiar signo
  signo: function(){
    this.display *= -1;
    this.showDisplay(this.display);
  },
  //funcion agregar punto decimal
  punto: function(){
    if(this.display.indexOf('.') == -1) this.display = this.display + '.';
    this.showDisplay(this.display);
  },
  //funcion realizar operacion
  operacion: function(operador){
    this.rflag = false;
    this.operador = operador;
    this.resultado = parseFloat(this.display);
    this.display = '0';
    this.showDisplay(this.display);
  },
  //funcion raiz cuadrada
  raiz: function(){
    this.resultado = parseFloat(this.display);
    if(this.resultado >= 0){
      this.resultado = this.truncar(Math.sqrt(this.resultado));
      this.display = this.resultado;
      this.showDisplay(this.display);
      this.rflag = true;
    } else {
      this.reset();
      this.showDisplay('Err imag');
    }
  },
  //funcion truncar resultado a 8 digitos
  truncar: function(num){
    var digits = num.toString();
    if(digits.replace(/[^0-9]/g,'').length > 8){
      if(digits.indexOf('.') >= 1) num = parseFloat(digits.substring(0, 9));
      else num = num.toExponential(5);
    }
    return num;
  },
  //funcion calcular resultado
  calcular: function(){
    if(!this.rflag) this.num = parseFloat(this.display);

    switch(this.operador){
      case 'sum': this.resultado += this.num; break;
      case 'res': this.resultado -= this.num; break;
      case 'mul': this.resultado *= this.num; break;
      case 'div':
        if(this.num == 0){
          this.reset();
          this.showDisplay('Err Div 0');
          return;
        }
        this.resultado /= this.num; break;
      default: this.resultado = this.num; break;
    }

    this.rflag = true;
    this.resultado = this.truncar(this.resultado);
    this.display = this.resultado;
    this.showDisplay(this.resultado);
  }
};

//arreglo de teclas y agregar eventos a cada tecla
var teclas = document.getElementsByClassName('tecla');
for(i = 0; i < teclas.length; i++){
  teclas[i].addEventListener('click', function(){
    var tecla = this.id;
    switch(tecla){
      case 'on': calc.reset(); break;
      case 'sign': calc.signo(); break;
      case 'raiz': calc.raiz(); break;
      case 'punto': calc.punto(); break;
      case 'igual': calc.calcular(); break;
      case 'mas': calc.operacion('sum'); break;
      case 'menos': calc.operacion('res'); break;
      case 'por': calc.operacion('mul'); break;
      case 'dividido':calc.operacion('div'); break;
      default: calc.numero(tecla); break;
    }
  });

  teclas[i].addEventListener('mousedown', function(){
    this.style.padding = '2px';
  });

  teclas[i].addEventListener('mouseup', function(){
    this.style.padding = '0px';
  });
}

//funcion autoejecutable. Iniciar calculadora
(function(){
  calc.reset();
})();
