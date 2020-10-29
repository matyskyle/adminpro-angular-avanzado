import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    //Tendremos acceso a la informacion del servicio sidebar
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
  }

}
