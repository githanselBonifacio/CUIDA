import { FormControl } from "@angular/forms";

export function validatorMayorEdad(control: FormControl): { [key: string]: boolean } | null {
    const birthday = new Date(control.value);
    const ageInMs = Date.now() - birthday.getTime();
    const ageInYears = ageInMs / (1000 * 60 * 60 * 24 * 365);
    return ageInYears >= 18 ? null : { 'ageInvalid': true };
}