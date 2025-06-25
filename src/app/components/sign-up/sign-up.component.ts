import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{
  genre =[
    {value: 'femme', text:"Femme"},
    {value: 'homme', text:"Homme"}
  ]
  signUpForm! : FormGroup;
  constructor(private formBuilder: FormBuilder){

  }

  ngOnInit(): void { 
    this.signUpForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      gen: ['', [Validators.required]],
      nom_utilisateur: ['',[Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value)
    }
  }
}
