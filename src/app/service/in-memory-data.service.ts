import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { utilisateurs } from '../models/utilisateurs/utilisateurs';
import { Projet } from '../models/projets/projets.model';

@Injectable({
  providedIn: 'root'
})

// API virtuelle mock 
// 'InMemory' cad donnees initialise avec chaque demarrage

//prerequis en terminal:
//npm i angular-in-memory-web-api@0.19.0
//ng g service in-memory-data
export class InMemoryDataService implements InMemoryDataService {

  constructor() { }

  createDb() {
    // const todos : Todo[] = [
    //   //Urgentes: priority = 1 Et due date = Aujourd'hui
    //   {id:1, title:'Appeler Secu', completed: false, priorite:'1', dueDate:new Date().toISOString(), description:null},

    //   //A faire aujourd'hui: due date = Aujourd'hui
    //   {id:2, title:'Envoyer email', completed: false, priorite:null, dueDate:new Date().toISOString(), description: null},

    //   //Tache en retard: due date < Aujourd'hui
    //   {id:3, title:'Declaration impot', completed: false, priorite:null, dueDate:new Date(2025,5,1).toISOString(), description:null},

    //   //Tache en retard: due date < Aujourd'hui
    //   {id:4, title:'Envoyer CV', completed: false, priorite:null, dueDate:new Date(2025,5,2).toISOString(), description: null},
    // ];
    const todos : Todo[] = [];

    const utilisateurs: utilisateurs[] = [
      {id: 1, nom:"user 1", prenom:"user prenom 1", genre: "femme", age:20, username:"user1123"},
      {id: 2, nom:"user 2", prenom:"user prenom 2", genre: "femme", age:20, username:"user1223"},
      {id: 3, nom:"user 3", prenom:"user prenom 3", genre: "femme", age:20, username:"user1233"},
      {id: 4, nom:"user 4", prenom:"user prenom 4", genre: "femme", age:20, username:"user1234"},
      {id: 5, nom:"user 5", prenom:"user prenom 5", genre: "femme", age:20, username:"user1235"},
    ]

    const projets:Projet[] = [];

    return { todos, utilisateurs, projets}; // un lien endpoint api/todos 
  }
}
