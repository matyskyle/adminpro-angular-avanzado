import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      numero => console.log('Subs: ', numero),
      error => console.log('Error con el sub.', error),
      () => console.log('El observador termino!')
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    console.log('La pag se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;

      let intervalo = setInterval( () => {
        contador ++;

        let salida = {
          valor: contador
        };

        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('ME HE MORIDO');
        // }
      },1000);
    }).pipe(
      map( respuesta =>  respuesta.valor),
      filter( (valor, index) => {
        if ( (valor % 2) === 1 ) {
          //impar
          return true;
        } else {
          //par
          return false;
        }
      })
    );
  }

}
