import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef;

  @Input('nombre') public leyenda: string = 'Leyenda';
  @Input() public porcentaje: number = 50;
  @Output() public cambioPorcentaje: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cambiosInput(nuevoValor:number){
    // let elementoHTML: any = document.getElementsByName("porcentaje")[0];
    if (nuevoValor >= 100) {
      this.porcentaje = 100;

    } else if(nuevoValor <= 0){
      this.porcentaje = 0;

    }else{
      this.porcentaje = nuevoValor;
    }
    
    // elementoHTML.value = this.porcentaje;
    this.txtPorcentaje.nativeElement.value = this.porcentaje;
    this.cambioPorcentaje.emit(this.porcentaje);
  }

  cambiarValor(valor:number){
    if (this.porcentaje > 100 || this.porcentaje < 0) {
      alert("Error");
    } else {
      this.porcentaje = this.porcentaje + valor;
      if (this.porcentaje >= 100 && valor > 0) {
        this.porcentaje = 100;
      }
      else if (this.porcentaje <= 0 && valor < 0) {
        this.porcentaje = 0;
      }

      this.cambioPorcentaje.emit(this.porcentaje);
      this.txtPorcentaje.nativeElement.focus();
    }
  }

}
