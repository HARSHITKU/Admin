import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
// import { Innovation } from 'src/app/models/Innovation';

@Injectable({
  providedIn: 'root',
})
export class InnovationService {
  
  baseURL: string = '';

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;
  }

  getInnovationListData(): Observable<any> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/innovations';
    return this.http.get<any>(apiUrl, httpOptions);
  }

  getInnovation(innovationId: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/innovations/' + innovationId;
    return this.http.get<any>(apiUrl, httpOptions);
  }

  deleteInnovation(innovationId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/innovations/' + innovationId;
    return this.http.delete(apiUrl, httpOptions);
  }

  addInnovation(innovation: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/innovations';
    return this.http.post(apiUrl, innovation, httpOptions);
  }

  updateInnovation(innovation: any, userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/innovations/' + userId;
    return this.http.patch(apiUrl, innovation, httpOptions);
  }
}
