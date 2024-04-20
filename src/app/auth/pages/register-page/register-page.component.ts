import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private formBuilder = inject(FormBuilder);

  public myForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })


  login(){
    console.log(this.myForm.value);
  }


}
