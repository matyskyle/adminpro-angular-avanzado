import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  get nombre(){
    return this.forma.get('nombre');
  }
  
  get email(){
    return this.forma.get('email');
  }
  
  get contrasena(){
    return this.forma.get('contrasena');
  }
  
  get contrasena2(){
    return this.forma.get('contrasena2');
  }

  sonIguales( campo1: string, campo2: string ){
    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass2 === pass1) {
        return null;
      }

      return {
        sonIguales: true
      };
    }
  }

  ngOnInit(): void {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      contrasena: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      contrasena2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false, Validators.requiredTrue),
    }, { validators: this.sonIguales( 'contrasena', 'contrasena2' ) });
  }

  registrarUsuario(){
    console.log(this.forma.value);

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.contrasena
    );

    this._usuarioService.crearUsuario(usuario).subscribe(
      resp => this.router.navigate(['/login'])
    );

  }

}
