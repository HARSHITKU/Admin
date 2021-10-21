import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { Charity } from 'src/app/models/charity';

@Injectable({
  providedIn: 'root',
})
export class CharityService {
  
  baseURL: string = '';

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;
  }

  getCharityListData(): Observable<any> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/charities';
    return this.http.get<any>(apiUrl, httpOptions);
  }

  getCharity(charityId: any): Observable<Charity> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/charities' + charityId;
    return this.http.get<Charity>(apiUrl, httpOptions);
  }

  deleteCharity(id: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/charities/' + id;
    return this.http.delete(apiUrl, httpOptions);
  }

  addCharity(Charity: Charity): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/charities';
    return this.http.post(apiUrl, Charity, httpOptions);
  }

  updateCharity(Charity: any, id: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/charities/' + id;
    return this.http.patch(apiUrl, Charity, httpOptions);
  }
}
