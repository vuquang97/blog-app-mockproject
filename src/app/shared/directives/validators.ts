import { AbstractControl } from '@angular/forms';

export function onlyCharacter(control: AbstractControl): { [key: string]: any } | null {

    let regex = /[^\s]/g;

    return control.value.length < 1 || !regex.test(control.value) ? {'onlyCharacter': {'value': control.value}} : null;
}

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {

    let regex = /^[a-z][\w\.\-]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;

    return control.value.length < 1 || !regex.test(control.value) ? {'emailValidator': {'value': control.value}} : null;
}