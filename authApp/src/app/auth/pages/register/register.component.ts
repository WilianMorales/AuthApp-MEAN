import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  myForm: FormGroup = this._fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.myForm.reset({
      name: 'Demo Test',
      email: 'demo@test.com',
      password: '123456'
    })
  }

  register() {
    const { name, email, password } = this.myForm.value;

    this._authService.register(name, email, password)
      .subscribe(ok => {
        if (ok === true) {
          Swal.fire({
            icon: 'success',
            position: 'top-end',
            title: 'Registro exitoso',
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
