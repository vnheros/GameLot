import { FormControl } from "@angular/forms";

export class PasswordValidator {
    static checkPassword(control: FormControl) {
        //console.log("checking password..." + control.value);
        // {4,10}       - password must be between 4 and 10 characters
        // (?=.*[0-9])  - password must have at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,10}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
}