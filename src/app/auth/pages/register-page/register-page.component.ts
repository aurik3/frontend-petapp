import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private fb = inject( FormBuilder )
  private UserService = inject( UserService )
  private router = inject( Router)

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required] ],
    username: ['', [Validators.required] ],
    email: ['', [Validators.required ,Validators.email] ],
    password: ['', [Validators.required,Validators.minLength(6)] ]
  })

  register() {
    const {name, username, email, password} = this.myForm.value
    this.UserService.createUser(name, username, email, password).subscribe({
      next: () => this.router.navigateByUrl('/auth/login'),
      error: (err) => {
        Swal.fire({
          title: err,
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

      }
    })
    console.log(this.myForm.value)
  }

}
