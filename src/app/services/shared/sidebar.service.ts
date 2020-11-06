import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo:'principal',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Graficas', url: '/graficas1'},
        {titulo: 'Formulario', url: '/formulario'},
        {titulo: 'Promesas', url: '/promesas'},
        {titulo: 'Rxjs', url: '/rxjs'}
      ]
    },
    {
      titulo:'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo:'Usuarios', url: '/usuarios'},
        {titulo:'Medicos', url: '/medicos'},
        {titulo:'Hospitales', url: '/hospitales'},
      ]
    }
  ];
  constructor() { }
}
