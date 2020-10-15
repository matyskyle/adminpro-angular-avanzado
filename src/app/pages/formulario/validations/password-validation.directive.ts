import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn, Validators } from '@angular/forms';

export function passwordValidation():ValidatorFn{
  return (control: AbstractControl) => {
    let passwordValidationDirective = new PasswordValidationDirective();
    return passwordValidationDirective.validate(control);
  }
}

@Directive({
  selector: '[passwordValidation]',
  providers: [{provide:NG_VALIDATORS, useExisting: PasswordValidationDirective, multi: true}]
})
export class PasswordValidationDirective implements Validators{
  
  passwordProhibidos = ['123456', 'asdfgh','123456789'];

  validate(control: import("@angular/forms").AbstractControl): import ("@angular/forms").ValidationErrors{
    let password = <string>control.value;

    if(!password){return;}

    if(password.length < 6){
      return {'passwordValidation':{'message':'El minimo de caracteres es 6'}};
    }

    if(this.passwordProhibidos.indexOf(password) !== -1){
      return {'passwordValidation':{'message':'Escoge un mejor password'}};
    }

    if (password === password.toLowerCase()){
      return {'passwordValidation': {'message': 'Tu password debe de contener mayúsculas'}}
    }
 
    if (password === password.toUpperCase()){
      return {'passwordValidation': {'message': 'Tu password debe de contener minúsculas'}}
    }
 
    if (!/\d/.test(password)){
      return {'passwordValidation': {'message': 'Tu password debe de incluir un caracter numérico'}}
    }
    
    return null;
  }
  constructor() { }

}
