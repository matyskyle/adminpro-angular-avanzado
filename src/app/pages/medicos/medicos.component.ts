import { Component, OnInit } from '@angular/core';
import { MedicoService, UsuarioService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  admin: boolean = false;

  constructor(
    public _medicoServices: MedicoService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarMedico();

    this._modalUploadService.notificacion.subscribe(
      resp => this.cargarMedico() );
  }

  mostrarModal( id: string ){

    this._modalUploadService.mostrarModal( 'medicos', id );

  }

  cargarMedico(){

    this.cargando = true;
    let medico: Medico;
    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      this.admin = true;
    }

    this._medicoServices.cargarMedicos( this.desde ).subscribe(
      medico => this.medicos = medico );
  }

  cambiarPaginacion( valor: number ){

    let desde = this.desde + valor;

    if ( desde >= this._medicoServices.totalMedicos || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedico();
  }

  buscarMedico( termino: string ){
    
    if ( termino.length <= 0 ) {
      this.cargarMedico();
      return;
    }
    this.cargando = true;
    this._medicoServices.buscarMedico( termino ).subscribe( 
      (medico: Medico[]) => {
        this.medicos = medico;
        this.cargando = false;
    });
  }

  borrarMedico( medico: Medico ){
    // if ( hospital._id === this._hospitalService.hospital._id ) {
    //   swal('Error al borrar hospital', 'No se puede borrar al hospital', 'error');
    // } else{
      swal({
        title:'¿Estas seguro?',
        text: 'Esta a punto de eliminar a '+ medico.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then( borrar => {
  
        console.log( borrar );
        if ( borrar ) {
          this._medicoServices.borrarMedico( medico._id ).subscribe(
            borrado => {
              console.log( borrado );
              this.desde = 0;
              this.cargarMedico();
            });
        }
      });
    // }
  }

  guardarCambios( medico: Medico ){

    this._medicoServices.actualizarMedico( medico ).subscribe();
  }

}
