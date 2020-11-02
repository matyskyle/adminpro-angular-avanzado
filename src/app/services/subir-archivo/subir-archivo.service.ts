import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo ( archivo: File, tipo: string, id: string ) {

    let formData = new FormData();
    let xhr = new XMLHttpRequest();

    formData.append( 'imagen', archivo, archivo.name );

    return new Promise( (resolve, reject) => {

      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4) {
          
          if ( xhr.status === 200) {
            console.log('imagen subida');
            resolve( JSON.parse(xhr.response) );
          } else {
            console.log( 'fallo al subir archivo.' );
            reject( xhr.response );
          }

        }
      };

    let url = URL_SERVICIOS + '/uploads/' + tipo + '/' + id;

    xhr.open( 'PUT', url, true );
    xhr.send( formData );
    });

  }
}
