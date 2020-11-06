import { Component, OnInit } from '@angular/core';
import { HospitalService, UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  admin: boolean = false;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarHospital();

    this._modalUploadService.notificacion.subscribe(
      resp => this.cargarHospital() );
  }

  mostrarModal( id: string ){

    this._modalUploadService.mostrarModal( 'hospitales', id );

  }

  crearHospital(){

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( ( valor: string ) => {

      if ( !valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
          .subscribe( () => this.cargarHospital() );
    });

  }

  cargarHospital(){

    this.cargando = true;
    let hospital: Hospital;
    if ( this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      this.admin = true;
    }

    this._hospitalService.cargarHospitales( this.desde ).subscribe(
      hospital => this.hospitales = hospital );
  }

  cambiarPaginacion( valor: number ){

    let desde = this.desde + valor;

    if ( desde >=  this._hospitalService.totalHospitales || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospital();
  }

  buscarHospital( termino: string ){
    
    if ( termino.length <= 0 ) {
      this.cargarHospital();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital( termino ).subscribe( 
      (hospital: Hospital[]) => {
        this.hospitales = hospital;
        this.cargando = false;
    });
  }

  borrarHospital( hospital: Hospital ){
    // if ( hospital._id === this._hospitalService.hospital._id ) {
    //   swal('Error al borrar hospital', 'No se puede borrar al hospital', 'error');
    // } else{
      swal({
        title:'¿Estas seguro?',
        text: 'Esta a punto de eliminar a '+ hospital.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then( borrar => {
  
        console.log( borrar );
        if ( borrar ) {
          this._hospitalService.borrarHospital( hospital._id ).subscribe(
            borrado => {
              console.log( borrado );
              this.desde = 0;
              this.cargarHospital();
            });
        }
      });
    // }
  }

  guardarCambios( hospital: Hospital ){

    this._hospitalService.actualizarHospital( hospital ).subscribe();
  }
}