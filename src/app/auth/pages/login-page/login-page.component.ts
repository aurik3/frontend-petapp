import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService )
  private router      = inject( Router)

  public myForm: FormGroup = this.fb.group({
    username: ['aurik3', [Validators.required] ],
    password: ['123456', [Validators.required,Validators.minLength(6)] ]
  })

  login(){
    const {username, password} = this.myForm.value
    this.authService.login(username, password)
    .subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (errorMessage) => {
        // Swal.fire('Error', errorMessage, 'error')

        Swal.fire({
          title: errorMessage,
          width: 400,
          padding: "3em",
          color: "#716add",
          background: "#fff url('../../../../assets/images/huellitas.jpg')",
          backdrop: `
            rgba(0,0,123,0.4)
            url('../../../../assets/images/perrito.gif')
            center top
            no-repeat
          `
        });
      },
    })
  }

}
