import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ageValidator():  ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>  
    
    (new Date().valueOf() - new Date(control.value).valueOf())/(1000*60*60*24) >= 6574
        ? null : {dateForAdult: control.value};
}