import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url ).pipe( map( 
      ( resp:any ) => {
        this.totalHospitales = resp.total;
        return resp.hospital;
      }));
  }

  obtenerHospital( id: string ){

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).pipe( map( ( resp: any ) => {
      return resp.hospital;
    }));

  }

  borrarHospital( id: string ){

    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url ).pipe( map( resp => {
      swal('Hospital Borrado','Eliminado correctamente','success');
    }));
  }

  crearHospital( nombre: string ){

    let url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;
    return this.http.post( url, { nombre } ).pipe( map( ( resp: any ) => resp.hospital ));

  }

  buscarHospital( termino: string ){

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    return this.http.get( url ).pipe( map( (resp: any) => resp.hospital ));

  }

  actualizarHospital( hospital: Hospital){

    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital ).pipe( map( ( resp: any ) => resp.hospital ));
  }
}
