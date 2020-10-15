import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.contarTres().then(
      () => console.log('TERMINO!')
    ).catch( error => console.error('Error en la promesa!', error));
  }

  ngOnInit(): void {
  }

  contarTres(): Promise<Boolean>{
    
    return new Promise( (resolve, reject) => {
      
      let contador = 0;

      let intervalo = setInterval( ()=>{
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          //TERMINADO, se puede modificar el mensaje
          resolve(true);
          //ERROR, se puede modificar el mensaje
          // reject('Error en la ejecucion');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
