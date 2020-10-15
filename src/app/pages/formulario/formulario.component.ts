import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordValidation } from './validations/password-validation.directive';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: [
  ]
})
export class FormularioComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  get nombreUsuario(){
    return this.formularioRegistro.get('nombreUsuario');
  }

  get correoUsuario(){
    return this.formularioRegistro.get('correoUsuario');
  }

  get descripcionUsuario(){
    return this.formularioRegistro.get('descripcionUsuario');
  }

  get contrasenaUsuario(){
    return this.formularioRegistro.get('contrasena');
  }

  formularioRegistro = this.formBuilder.group({
    nombreUsuario: ['',Validators.required],
    correoUsuario: ['',{
      validators:[Validators.required, Validators.email]
    }],
    descripcionUsuario: [''],
    contrasena: ['',{
      validators:[Validators.required, Validators.minLength(6), passwordValidation()]
    }],
    confirmacion: [null,Validators.requiredTrue],
  });

  ngOnInit(): void {
  }

  submit(){
    if (!this.formularioRegistro.valid) {
      alert('Complete todos los campos requeridos...');
      return;
    }

    console.log(this.formularioRegistro.value)
  }

  Limpiar(){
    this.formularioRegistro.patchValue({
      nombreUsuario: '',
      correoUsuario: '',
      descripcionUsuario: '',
      contrasena: '',
      confirmacion: null,
    })
  }
}
