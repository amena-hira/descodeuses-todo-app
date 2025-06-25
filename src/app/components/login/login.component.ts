import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//'@' signifie decorateur
//qui decore la classe component
// il vient juste avant la classe

//standalone: false
//composant accessible via un module seulement
//oblgiatoire de le mettre dans 'declarations' du app.module.ts (Module)
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
//'implements' pour implementer une interface
//une classe peut implementer plusieurs interfaces
export class LoginComponent implements OnInit {
  //'!' pour pouvoir initialiser la variable ultérieurement
  loginForm!: FormGroup;

  //j'utilise l'injection automatique de angular pour recuperer
  //un objet form builder qui va construire le formulaire
  //pour faire cela j'ajoute ce que j'ai besoin dans les parametres

  //'private' avant formBuilder pour pouvoir acceder a la variable
  //en dehors du constructeur
  constructor(private formBuilder: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      //1er parametre: valeur initiale du champ
      //2eme parametre: liste de validators
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);

      if (
        this.loginForm.value.username == 'admin@gmail.com' &&
        this.loginForm.value.password == 'admin'
      ) {
        console.log(true);
        sessionStorage.setItem('isloggedIn', 'true');
        this.route.navigateByUrl('')
      }
    }
  }
}
