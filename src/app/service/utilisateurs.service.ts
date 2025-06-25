import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { utilisateurs } from '../models/utilisateurs/utilisateurs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {
  private apiURL = 'api/utilisateurs';

  constructor(private http:HttpClient) { }

  addUser(item:utilisateurs){
    return this.http.post<utilisateurs>(this.apiURL, item)
  }

  getUsers(){
    return this.http.get<utilisateurs[]>(this.apiURL);
  }

  getUser(id: number){
    return this.http.get<utilisateurs>(this.apiURL+'/'+id);
  }

  updateUser(item: utilisateurs){
    return this.http.put<utilisateurs>(this.apiURL+'/'+item.id, item)
  }

  deleteUser(id: number){
    return this.http.delete(this.apiURL+'/'+id)
  }
}
