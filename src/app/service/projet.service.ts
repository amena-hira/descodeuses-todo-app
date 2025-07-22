import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../models/projets/projets.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiURL = 'http://localhost:8080/api/project';

  constructor(private http:HttpClient) { }

  addUser(item:Projet){
    return this.http.post<Projet>(this.apiURL, item)
  }

  getUsers(){
    return this.http.get<Projet[]>(this.apiURL);
  }

  getUser(id: number){
    return this.http.get<Projet>(this.apiURL+'/'+id);
  }

  updateUser(item: Projet){
    return this.http.put<Projet>(this.apiURL+'/'+item.id, item)
  }

  deleteUser(id: number){
    return this.http.delete(this.apiURL+'/'+id)
  }
}
