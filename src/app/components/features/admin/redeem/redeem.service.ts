import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { RedeemDetails } from 'src/app/models/redeem-details';

@Injectable({
  providedIn: 'root'
})
export class RedeemService {

  baseURL: string = '';

  constructor(private http: HttpClient, private commonService: CommonService) {
    this.baseURL = this.commonService.base_URL;
  }
  
  getAllRedeem(): Observable<any> {
    let token = localStorage.getItem('token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/products';
    return this.http.get<any>(apiUrl, httpOptions);
  }
  getRedeemById(userId: any): Observable<any> {
    let token = localStorage.getItem('products');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/products/' + userId;
    return this.http.get<any>(apiUrl, httpOptions);
  }
  deleteRedeem(userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/products/' + userId;
    return this.http.delete(apiUrl, httpOptions);
  }
  addRedeem(redeemData: any): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/products';
    return this.http.post(apiUrl, redeemData, httpOptions);
  }

  updateRedeem(redeemData: any, userId: string): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    const apiUrl = this.baseURL + 'admin/products/' + userId;
    return this.http.patch(apiUrl, redeemData, httpOptions);
  }

}
