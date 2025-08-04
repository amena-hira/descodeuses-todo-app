import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { utilisateurs } from '../models/utilisateurs/utilisateurs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl+'/auth';

  constructor(private http: HttpClient) {}

  login(payload : any): Observable<any> {
    return this.http.post(`${this.apiUrl+'/login'}`, payload);
  }

  signup(user: utilisateurs):Observable<any>{
    return this.http.post(`${this.apiUrl+'/signup'}`, user);
  }

  
}
