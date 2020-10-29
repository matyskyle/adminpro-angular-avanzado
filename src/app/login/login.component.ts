import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    }
  }

  //Inicializar las autorizaciones de la cuenta Google para el Login con Google
  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        clien_id:'458316045892-j0lbqn063ldbgq5dk2rmk1f7pvp57vii.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));
    });

  }

  //
  attachSignin( element ){
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile;
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle( token )
      .subscribe( 
        //forma manual para realizar el cambio de pagina sin volver a cargar la aplicacion
        resp => window.location.href = '#/dashboard'
        );
    });
  }

  ingresar( forma: NgForm){

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.contrasena);

    this._usuarioService.login( usuario, forma.value.recuerdame )
    //forma normal de navegacion por paginas, realizando un refresh
    .subscribe( correcto => this.router.navigate(['/dashboard']));
  }

}
