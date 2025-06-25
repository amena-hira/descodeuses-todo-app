import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { map } from 'rxjs';

//commande pour creer le fichier:
//ng g service todo

//Le service fait le lien entre le front et le back

//Il fait les operations CRUD: Create, Read, Update, Delete
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiURL = 'api/todos';

  //HttpClient pour communiquer avec le API/Backend
  constructor(private http: HttpClient) { }

  //C R U D 
  
  //C : Create
  addTodo(item : Todo) {
    return this.http.post<Todo>(this.apiURL, item);
  }

  //R : Read
  //Fetch liste
  getTodos() {
    //HTTP GET sans 2eme parametre parce que il y a pas de body
    return this.http.get<Todo[]>(this.apiURL);
  }

  //R : Read
  //Fetch un item de todo par son Id
  getTodo(id : number) {
    return this.http.get<Todo>(this.apiURL +'/'+ id);
  }

  //U : Update
  updateTodo(item : Todo) {
    return this.http.put<Todo>(this.apiURL +'/'+ item.id, item).pipe(
      map(response=>{
        return response ?? item;
      })
    );
  }

  //D : Delete
  deleteTodo(id : number) {
    return this.http.delete(this.apiURL +'/'+ id);
  }

}
