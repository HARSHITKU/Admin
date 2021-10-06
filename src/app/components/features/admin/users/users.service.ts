import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/models/user-data';
import { CommonService } from 'src/app/services/common.service';
import { UserDetails } from 'src/app/models/user-details';
import { NewUser } from 'src/app/models/new-user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  baseURL: string = '';

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;
  }

  getUserListData(): Observable<UserData> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/users';
    return this.http.get<UserData>(apiUrl, httpOptions);
  }

  getUser(userId: any): Observable<UserDetails> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/users/' + 'userId';
    return this.http.get<UserDetails>(apiUrl, httpOptions);
  }

  deleteUser(userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/users/' + userId;
    return this.http.delete(apiUrl, httpOptions);
  }

  addUser(userData: NewUser): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/users/';
    return this.http.post(apiUrl, userData, httpOptions);
  }

  updateUser(userData: NewUser, userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/users/' + userId;
    return this.http.patch(apiUrl, userData, httpOptions);
  }
}
