import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  admin: boolean = false;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(
      resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ){

    this._modalUploadService.mostrarModal( 'usuarios', id );

  }

  cargarUsuarios(){

    this.cargando = true;
    let usuario: Usuario;
    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      this.admin = true;
    }

    this._usuarioService.cargarUsuario( this.desde ).subscribe(
      ( resp: any ) => {
        
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;

        this.cargando = false;
      });
  }

  cambiarPaginacion( valor: number ){

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ){
    
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino ).subscribe( 
      (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ){
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('Error al borrar usuario', 'No se puede borrar al usuario', 'error');
    } else{
      swal({
        title:'¿Estas seguro?',
        text: 'Esta a punto de eliminar a '+ usuario.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then( borrar => {
  
        if ( borrar ) {
          this._usuarioService.borrarUsuario( usuario._id ).subscribe(
            borrado => {
              this.desde = 0;
              this.cargarUsuarios();
            });
        }
      });
    }
  }

  guardarCambios( usuario: Usuario ){

    this._usuarioService.actualizarUsuario( usuario ).subscribe();
  }
}
