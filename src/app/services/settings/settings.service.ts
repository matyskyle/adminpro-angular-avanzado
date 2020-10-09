import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes ={
    temaUrl:'assets/css/colors/default-dark.css',
    tema:'default-dark',
  }

  constructor(
    //DOCUMENT es para @angular/common, el cual injectara la 
    //nueva id que se entregara con ".setAttribute"
    @Inject(DOCUMENT) private _document:Document,) {
    this.cargarAjustes();
   }

  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarAjustes(this.ajustes.tema);
    } else {
      this.aplicarAjustes(this.ajustes.tema);
    }
  }

  aplicarAjustes(tema:string){
    let url = `assets/css/colors/${tema}.css`
    this._document.getElementById('tema').setAttribute('href',url);
    
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = `assets/css/colors/${tema}.css`;
    this.guardarAjustes();
  }
}

interface Ajustes{
  temaUrl: string;
  tema: string;
}
