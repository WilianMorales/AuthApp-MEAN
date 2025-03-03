import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  myForm: FormGroup = this._fb.group({
    email: ['test1@test.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]]
  });

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
  ) { }

  login() {
    const { email, password } = this.myForm.value;
    this._authService.login( email, password )
      .subscribe( ok => {
        if ( ok === true ) {
          Swal.fire({
            icon: 'success',
            position: 'top-end',
            title: 'Bienvenido',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            width: 300,
          })
          this.router.navigateByUrl('/dashboard');
        } else {
          if (ok.msg) {
            Swal.fire('Error', ok.msg.toString(), 'error')
          } else {
              const { errors: { errors } } = ok
              Swal.fire('Error', errors[0].msg.toString(), 'error')
          }
        }
      })
  }

}
