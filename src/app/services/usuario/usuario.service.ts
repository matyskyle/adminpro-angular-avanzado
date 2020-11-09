import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService 
  ) { 
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5)? true : false;
  }

  cargarStorage(){
    
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
  
  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ){
    
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );
    localStorage.setItem( 'menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  //CONFIRMACION GOOGLE
  loginGoogle( token: string ){

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token } ).pipe(
      map( ( resp:any ) => {
        
        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
        return true;
      }));

  }

  //INGRESAR
  login( usuario: Usuario, recordar: boolean = false ){

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario ).pipe( map( (resp:any) => {

      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
      return true;
    }));
  }

  //LOGOUT
  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  //CREAR USUARIO
  crearUsuario( usuario:Usuario ){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario ).pipe(map( (resp: any) => { 
      swal("Registro Exitoso!", "Inicia sesion para continuar", "success");
      return resp.usuario; 
    }));

  }

  //ACTUALIZAR USUARIO
  actualizarUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put( url, usuario).pipe( map( (resp: any) => {

      if ( usuario._id === this.usuario._id ) {

        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
      }

      swal("Actualizado Exitosa!", usuario.nombre, "success");
      return true;
    }));

  }

  //Acualizar imagen
  cambiarImagen( archivo: File, id: string ){
    
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
    .then( ( resp: any ) => {

      this.usuario.img = resp.usuario.img;
      swal("Imagen actualizada!", this.usuario.nombre, "success");

      this.guardarStorage( id, this.token, this.usuario, this.menu );
      
    }).catch( resp => {
      console.log(resp);
    });
  }

  //OBTENER USUARIOS
  cargarUsuario( desde:number = 0){
    
    let url = URL_SERVICIOS + '/usuario' + '?desde=' + desde;

    return this.http.get( url );

  }

  //BUSCAR USUARIOS
  buscarUsuarios( termino: string ){

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
    return this.http.get( url ).pipe( map( (resp: any) => resp.usuario ));

  }

  //BORRAR USUARIO
  borrarUsuario( id: string ){

    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete( url ).pipe( map(
      resp => {
        swal('Usuario borrado','El usuario  a sido borrado correctamente','success');
        return true;
      }));
  }
}
