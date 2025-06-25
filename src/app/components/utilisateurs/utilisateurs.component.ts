import { Component, OnInit } from '@angular/core';
import { utilisateurs } from '../../models/utilisateurs/utilisateurs';
import { UtilisateursService } from '../../service/utilisateurs.service';

@Component({
  selector: 'app-utilisateurs',
  standalone: false,
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit{
  utilisateur: utilisateurs[] = [];

  constructor(private utilisateursService: UtilisateursService){}

  ngOnInit(): void {
    this.utilisateursService.getUsers().subscribe((data)=>{
      this.utilisateur = data;
    })
  }
}
