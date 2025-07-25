import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

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
  constructor(private formBuilder: FormBuilder, private route: Router, public authService: AuthService){

  }

  ngOnInit(): void { 
    this.signUpForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      gen: ['', [Validators.required]],
      username: ['',[Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    console.log("before",this.signUpForm.value)
    if (this.signUpForm.valid) {
      console.log("after",this.signUpForm.value)
      this.authService.signup(this.signUpForm.value).subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('authToken', res.token);
          this.route.navigateByUrl('');
        },
        error: (err) => console.error('Erreur de connexion', err),
      
      })
    }
  }
}
