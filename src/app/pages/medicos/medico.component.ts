import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '', '', '', '');

  constructor( 
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    public router: Router,
    public activatedRout: ActivatedRoute
  ) {

    activatedRout.params.subscribe( params => {

      let id = params['id'];

      if ( id != 'nuevo' ) {
        this.cargarMedico( id );
      }

    });

  }

  ngOnInit(){

    this._hospitalService.cargarHospitales().subscribe(
      hospital => this.hospitales = hospital
    );

    this._modalUploadService.notificacion.subscribe(
      resp => this.medico.img = resp.medico.img );
  }

  mostrarModal( id: string ){

    this._modalUploadService.mostrarModal( 'medicos', id );

  }

  cargarMedico( id: string ){

    this._medicoService.cargarMedico( id ).subscribe(
      medico => { 
        
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      
    });

  }
  
  guardarMedico( f: NgForm){

    if ( f.invalid ) {
      return;
    }

    this._medicoService.crearMedico( this.medico ).subscribe(
      medico => {

        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);

      });

  }

  cambioHospital( id: string ){

    this._hospitalService.obtenerHospital( id ).subscribe(
      hospital => this.hospital = hospital );

  }

}
