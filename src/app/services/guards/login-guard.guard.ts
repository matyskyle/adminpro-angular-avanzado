import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( 
    public _usuarioServices : UsuarioService,
    public router: Router ){}

  canActivate(){

    if ( this._usuarioServices.estaLogueado() ) {
      console.log('paso por el login Guard');
      return true;
    } else{
      this.router.navigate(['/login']);
      console.log('Bloqueado por el Guard');
      return false;
    }
  }
  
}
