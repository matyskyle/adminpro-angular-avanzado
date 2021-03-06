import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde:number = 0 ){

    let url = URL_SERVICIOS + '/medico' + '?desde=' + desde;
    
    return this.http.get( url ).pipe( map( ( resp: any ) => {

      this.totalMedicos = resp.total;
      return resp.medico;

    }));
  }

  cargarMedico( id: string ){

    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url ).pipe( map( ( resp: any ) => resp.medico )); 

  }

  buscarMedico( termino: string ){

    let url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;
    return this.http.get( url ).pipe( map( (resp: any) => resp.medico ));

  }

  crearMedico( medico: Medico ){

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      //actualizado
      url += '/' + medico._id + '?token=' + this._usuarioService.token; 
      return this.http.put( url, medico ).pipe( map( ( resp:any ) => {
  
        swal('Medico Actualizado!', medico.nombre,'success');
        return resp.medico;
      
      }));
    } else {
      //creando
      url += '?token=' + this._usuarioService.token; 
      return this.http.post( url, medico ).pipe( map( ( resp: any ) => {
  
        swal('Medico Creado!', medico.nombre,'success');
        return resp.medico;
      
      }));
    }

  }

  borrarMedico( id: string ){

    let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url ).pipe( map( resp => {
      swal('Medico Borrado','Eliminado correctamente','success');
    }));
  }
  
  actualizarMedico( medico: Medico){

    let url = URL_SERVICIOS + '/hospital/' + medico._id + '?token=' + this._usuarioService.token;
    return this.http.put( url, medico ).pipe( map( ( resp: any ) => { 
      resp.medico;

      swal("Actualizado Exitosa!", medico.nombre, "success");
     }));
  }
}
