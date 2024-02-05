import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: `./register.component.html`,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup | any;
  loading: boolean = false;
  hidePassword: boolean = true;

  constructor(private route: ActivatedRoute, private _userService: UserService,  
              private fb: FormBuilder, private toastr: ToastrService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      userData.role = 'user';
      this.loading = true;
      this._userService.registerUser(userData).subscribe({
        next: (data) => {
          this.toastr.success('El usuario fue registrado con exito', 'Usuario registrado')
          this.loading = false;
          this.router.navigate(['/', 'login'])
        },
          error: (error) => {
            this.toastr.error('Todos los campos son obligatorios', 'Error')
          }
      })        
    }
  }
}
