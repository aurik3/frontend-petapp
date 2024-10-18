import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  private fb = inject( FormBuilder )

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required] ],
    username: ['', [Validators.required] ],
    email: ['', [Validators.required ,Validators.email] ],
    password: ['', [Validators.required,Validators.minLength(6)] ]
  })

  register() {

    console.log(this.myForm.value)
  }

}
