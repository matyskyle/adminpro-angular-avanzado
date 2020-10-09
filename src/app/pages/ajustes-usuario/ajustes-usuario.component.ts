import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-ajustes-usuario',
  templateUrl: './ajustes-usuario.component.html',
  styles: [
  ]
})
export class AjustesUsuarioComponent implements OnInit {

  constructor(
    public _ajustes: SettingsService
  ) { }

  ngOnInit(): void {
    this.detectarCheck();
  }

  cambiarColor(tema: string, link: any){
    this.aplicarCheck(link);
    this._ajustes.aplicarAjustes(tema);
  }

  aplicarCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');

    for( let selector of selectores ){
      selector.classList.remove('working');
    }

    link.classList.add('working');
  }

  detectarCheck(){
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;

    for(let selector of selectores){
      if(selector.getAttribute('data-theme') === tema){
        selector.classList.add('working');
        break;
      }
    }
  }
}
